import { Injectable } from "@angular/core";
import { data } from "jquery";
import { IllegalDropTotalConverter } from "src/app/converter/illegal-drop-total.converter";
import { DivisionType } from "src/app/enum/division-type.enum";
import { TimeUnit } from "src/app/enum/time-unit.enum";
import { Division } from "src/app/network/model/division.model";
import { PagedList } from "src/app/network/model/page_list.model";
import { GetDivisionsParams, GetDivisionStatisticNumbersParamsV2 } from "src/app/network/request/division/division-request.params";
import { DivisionRequestService } from "src/app/network/request/division/division-request.service";
import { IllegalDropTotalModel, IllegalDropTotalSearchInfo } from "src/app/view-model/illegal-drop-total.model";
import { LocaleCompare } from "../../tools/locale-compare";
import { Time } from "../../tools/time";

@Injectable()
export class IllegalDropTotalBusiness {

  private map: Map<string, IllegalDropTotalModel> = new Map();

  constructor(private _divisionRequest: DivisionRequestService, private _converter: IllegalDropTotalConverter) {

  }

  async init(searchInfo: IllegalDropTotalSearchInfo, pageIndex: number = 1, pageSize: number = 9) {

    let params = new GetDivisionsParams();
    params.PageIndex = pageIndex;
    params.PageSize = pageSize;
    params.DivisionType = DivisionType.County;
    params.Ids = ['310109009000', "310109011000", '310109010000', '310109014000']


    // 获取原始数据
    let { Data, Page } = await this._getDivisionList(params);

    console.log(Data);
    // 转成视图数据
    let data = await this._converter.iterateToModel(Data);
    // this._getParentInfo(data);
    // this._getDivisionStatistic(data);


    // 保留 Page 字段
    let res: PagedList<IllegalDropTotalModel> = {
      Page: Page,
      Data: data,
    };

    return res;

  }


  private _getDivisionList(params: GetDivisionsParams) {
    return this._divisionRequest.list(params);
  }


  // private async _getParentInfo(data: IllegalDropTotalModel[]) {
  //   for (let i = 0; i < data.length; i++) {
  //     let model = data[i];
  //     this._register(model);

  //     if (model.ParentId) {
  //       if (this.map.has(model.ParentId)) {
  //         let parent = this.map.get(model.ParentId)!;
  //         model.ParentName = parent.Name;
  //       } else {
  //         let parentDivision = await this._getDivision(model.ParentId);
  //         let parent = this._converter.Convert(parentDivision);
  //         model.ParentName = parent.Name;
  //         this._register(parent)
  //       }
  //     }

  //   }
  // }
  // private async _getDivisionStatistic(data: IllegalDropTotalModel[]) {
  //   let params = new GetDivisionStatisticNumbersParamsV2();
  //   let ids = data.map(value => value.Id);
  //   params.DivisionIds = ids;
  //   params.TimeUnit = TimeUnit.Day;
  //   params.BeginTime = Time.beginTime(new Date());
  //   params.EndTime = Time.endTime(new Date())
  //   let res = await this._divisionRequest.statistic.number.history.list(params)
  //   console.log(res)

  //   for (let i = 0; i < data.length; i++) {
  //     // let model = data[i];

  //   }
  //   return data;
  // }

  // private _getDivision(id: string) {
  //   return this._divisionRequest.get(id);
  // }
  // private _register(model: IllegalDropTotalModel) {
  //   if (!this.map.has(model.Id)) {
  //     this.map.set(model.Id, model)
  //   }
  // }

}

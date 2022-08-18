import { Injectable } from "@angular/core";
import * as XLSX from 'xlsx';


import { EventNumberStatisticConverter } from "src/app/converter/illegal-drop-total.converter";
import { DivisionType } from "src/app/enum/division-type.enum";
import { EnumHelper } from "src/app/enum/enum-helper";
import { EventType } from "src/app/enum/event-type.enum";
import { TimeUnit } from "src/app/enum/time-unit.enum";
import { UserResourceType } from "src/app/enum/user-resource-type.enum";
import { DivisionNumberStatisticV2 } from "src/app/network/model/division-number-statistic-v2.model";
import { Division } from "src/app/network/model/division.model";
import { PagedList } from "src/app/network/model/page_list.model";
import { GetDivisionEventNumbersParams, GetDivisionsParams, GetDivisionStatisticNumbersParamsV2 } from "src/app/network/request/division/division-request.params";
import { DivisionRequestService } from "src/app/network/request/division/division-request.service";
import { GetGarbageStationsParams, GetGarbageStationStatisticNumbersParams, GetGarbageStationStatisticNumbersParamsV2 } from "src/app/network/request/garbage-station/garbage-station-request.params";
import { GarbageStationRequestService } from "src/app/network/request/garbage-station/garbage-station-request.service";
import { EventNumberStatisticCSV, EventNumberStatisticModel, EventNumberStatisticSearchInfo, EventNumberStatisticXLSX } from "src/app/view-model/event-number-statistic.model";
import { LocaleCompare } from "../../tools/locale-compare";
import { Time } from "../../tools/time";
import { HwExport } from "../../tools/hw-export";

@Injectable()
export class IllegalDropTotalBusiness {
  private map: Map<string, EventNumberStatisticModel> = new Map();
  count = 0;
  constructor(private _divisionRequest: DivisionRequestService, private _garbageStationRequest: GarbageStationRequestService, private _converter: EventNumberStatisticConverter) {

  }

  async init(searchInfo: EventNumberStatisticSearchInfo, pageIndex: number = 1, pageSize: number = 9) {

    // 获取原始数据
    let { Data, Page } = await this._getList(searchInfo, pageIndex, pageSize);

    // console.log('区划', Data)
    // 转成视图数据
    let models = await this._converter.iterateToModel(Data);

    // 本地缓存
    this._register(models);


    // 上级行政区
    for (let i = 0; i < models.length; i++) {
      let model = models[i];
      let parent = await this._getParentModel(model);
      if (parent) {
        model.ParentModel = parent;
      }
    }

    // 数量统计信息
    let statistics = await this._getStatistic(searchInfo, models);

    statistics.forEach(({ Id, EventNumbers = [] }) => {
      if (this.map.has(Id)) {
        let model = this.map.get(Id)!;
        EventNumbers.forEach(eventNumber => {
          if (eventNumber.EventType == EventType.IllegalDrop) {
            model.EventNumber = eventNumber.DayNumber.toString();
          }
        })
      }

    })

    models.sort((a, b) => {
      return LocaleCompare.compare(a.EventNumber, b.EventNumber)
    })

    // 保留 Page 字段
    let res: PagedList<EventNumberStatisticModel> = {
      Page: Page,
      Data: models,
    };

    return res;

  }

  exportCSV(title: string, header: string[], models: EventNumberStatisticModel[]) {
    let csvModels = models.map((model, index) => {
      let csvModel = new EventNumberStatisticCSV();
      csvModel.Id = (index + 1).toString();
      csvModel.Name = model.Name;
      csvModel.ParentName = model.ParentModel?.Name ?? '';
      csvModel.EventNumber = model.EventNumber;

      return csvModel;
    })
    HwExport.exportCSV(title, header, csvModels);

  }

  exportXLSX(title: string, header: string[], models: EventNumberStatisticModel[]) {
    let xlsxModels = models.map((model, index) => {
      let xlsxModel = new EventNumberStatisticXLSX();
      xlsxModel.Id = (index + 1).toString();
      xlsxModel.Name = model.Name;
      xlsxModel.ParentName = model.ParentModel?.Name ?? '';
      xlsxModel.EventNumber = model.EventNumber;

      return xlsxModel;
    })

    HwExport.exportXLXS(title, header, xlsxModels);

  }
  private _getList(searchInfo: EventNumberStatisticSearchInfo, pageIndex: number = 1, pageSize: number = 9) {
    if (searchInfo.ResourceType !== UserResourceType.Station) {
      let params = new GetDivisionsParams();
      params.PageIndex = pageIndex;
      params.PageSize = pageSize;
      params.AncestorId = searchInfo.ResourceId;
      params.DivisionType = EnumHelper.ConvertUserResourceToDivision(searchInfo.ResourceType)
      return this._divisionRequest.list(params);
    }
    else {
      let params = new GetGarbageStationsParams();
      params.PageIndex = pageIndex;
      params.PageSize = pageSize;
      params.AncestorId = searchInfo.ResourceId;
      return this._garbageStationRequest.list(params);
    }

  }


  private _getStatistic(searchInfo: EventNumberStatisticSearchInfo, models: EventNumberStatisticModel[]) {
    let ids = models.map(model => model.Id);
    if (searchInfo.ResourceType !== UserResourceType.Station) {
      let params = new GetDivisionStatisticNumbersParamsV2();
      params.TimeUnit = searchInfo.TimeUnit;
      params.BeginTime = searchInfo.BeginTime;
      params.EndTime = searchInfo.EndTime;
      params.DivisionIds = ids;
      let res = this._divisionRequest.statistic.number.history.list(params)
      return res;
    } else {
      let params = new GetGarbageStationStatisticNumbersParamsV2();
      params.TimeUnit = searchInfo.TimeUnit;
      params.BeginTime = searchInfo.BeginTime;
      params.EndTime = searchInfo.EndTime;
      params.GarbageStationIds = ids;
      let res = this._garbageStationRequest.statistic.number.history.list(params)
      return res;
    }
  }



  private async _getParentModel(model: EventNumberStatisticModel) {
    if (model.ParentId) {
      if (this.map.has(model.ParentId)) {
        let parentModel = this.map.get(model.ParentId)!;
        return parentModel;
      } else {
        let division = await this._getDivision(model.ParentId);
        let parentModel = this._converter.Convert(division);
        this._register([parentModel]);
        return parentModel;
      }

    }
    return null;
  }

  // 获取当前区划等级
  private _getDivision(id: string) {
    return this._divisionRequest.get(id);
  }

  private _register(models: EventNumberStatisticModel[]) {
    models.forEach(model => {
      this.map.set(model.Id, model)
    })

  }

}
// 15 个区
// 186 个街道
// 4197 个居委会
// 1496 个厢房
// 310115137025
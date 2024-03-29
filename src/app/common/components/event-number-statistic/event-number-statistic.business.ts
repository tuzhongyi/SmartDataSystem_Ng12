import { Injectable } from '@angular/core';
import { EventNumberStatisticConverter } from 'src/app/converter/illegal-drop-total.converter';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { EventType } from 'src/app/enum/event-type.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { PagedList } from 'src/app/network/model/page_list.model';
import {
  GetDivisionsParams,
  GetDivisionStatisticNumbersParamsV2,
} from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import {
  GetGarbageStationsParams,
  GetGarbageStationStatisticNumbersParamsV2,
} from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import {
  EventNumberStatisticCSV,
  EventNumberStatisticModel,
  EventNumberStatisticSearchInfo,
  EventNumberStatisticXLSX,
} from 'src/app/view-model/event-number-statistic.model';
import { LocaleCompare } from '../../tools/locale-compare';

import { ExportTool } from '../../tools/hw-export';
import { EventNumberStatisticExportConverter } from './event-number-statistic-export.converter';
import { ExportType } from 'src/app/enum/export-type.enum';

@Injectable()
export class IllegalDropTotalBusiness {
  private map: Map<string, EventNumberStatisticModel> = new Map();
  count = 0;
  constructor(
    private _divisionRequest: DivisionRequestService,
    private _garbageStationRequest: GarbageStationRequestService,
    private _converter: EventNumberStatisticConverter,
    private exportTool: ExportTool,
    private exportConverter: EventNumberStatisticExportConverter
  ) {}

  async init(
    searchInfo: EventNumberStatisticSearchInfo,
    pageIndex: number = 1,
    pageSize: number = 9
  ) {
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
        EventNumbers.forEach((eventNumber) => {
          if (eventNumber.EventType == EventType.IllegalDrop) {
            model.EventNumber = eventNumber.DayNumber.toString();
          }
        });
      }
    });

    models.sort((a, b) => {
      return LocaleCompare.compare(a.EventNumber, b.EventNumber);
    });

    // 保留 Page 字段
    let res: PagedList<EventNumberStatisticModel> = {
      Page: Page,
      Data: models,
    };

    return res;
  }

  exportCSV(
    title: string,
    header: string[],
    models: EventNumberStatisticModel[]
  ) {
    this.exportTool.export(
      ExportType.csv,
      title,
      header,
      models,
      this.exportConverter
    );
  }

  exportXLSX(
    title: string,
    header: string[],
    models: EventNumberStatisticModel[]
  ) {
    this.exportTool.export(
      ExportType.excel,
      title,
      header,
      models,
      this.exportConverter
    );
  }
  private _getList(
    searchInfo: EventNumberStatisticSearchInfo,
    pageIndex: number = 1,
    pageSize: number = 9
  ) {
    if (searchInfo.ResourceType !== UserResourceType.Station) {
      let params = new GetDivisionsParams();
      params.PageIndex = pageIndex;
      params.PageSize = pageSize;
      params.AncestorId = searchInfo.ResourceId;
      params.DivisionType = EnumHelper.ConvertUserResourceToDivision(
        searchInfo.ResourceType
      );
      return this._divisionRequest.list(params);
    } else {
      let params = new GetGarbageStationsParams();
      params.PageIndex = pageIndex;
      params.PageSize = pageSize;
      params.AncestorId = searchInfo.ResourceId;
      return this._garbageStationRequest.list(params);
    }
  }

  private _getStatistic(
    searchInfo: EventNumberStatisticSearchInfo,
    models: EventNumberStatisticModel[]
  ) {
    let ids = models.map((model) => model.Id);
    if (searchInfo.ResourceType !== UserResourceType.Station) {
      let params = new GetDivisionStatisticNumbersParamsV2();
      params.TimeUnit = searchInfo.TimeUnit;
      params.BeginTime = searchInfo.BeginTime;
      params.EndTime = searchInfo.EndTime;
      params.DivisionIds = ids;
      let res = this._divisionRequest.statistic.number.history.list(params);
      return res;
    } else {
      let params = new GetGarbageStationStatisticNumbersParamsV2();
      params.TimeUnit = searchInfo.TimeUnit;
      params.BeginTime = searchInfo.BeginTime;
      params.EndTime = searchInfo.EndTime;
      params.GarbageStationIds = ids;
      let res =
        this._garbageStationRequest.statistic.number.history.list(params);
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
    models.forEach((model) => {
      this.map.set(model.Id, model);
    });
  }
}
// 15 个区
// 186 个街道
// 4197 个居委会
// 1496 个厢房
// 310115137025

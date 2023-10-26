import { Injectable } from '@angular/core';
import { IllegalDropEventConverter } from 'src/app/aiop-system/components/illegal-drop-event/illegal-drop-event.converter';
import {
  IllegalDropEventModel,
  IllegalDropEventSearchInfo,
} from 'src/app/aiop-system/components/illegal-drop-event/illegal-drop-event.model';
import { SearchConditionKey } from 'src/app/enum/search-condition.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetEventRecordsParams } from 'src/app/network/request/event/event-request.params';
import { EventRequestService } from 'src/app/network/request/event/event-request.service';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { LocaleCompare } from '../../../common/tools/locale-compare';

@Injectable()
export class IllegalDropEventBusiness {
  private _stationMap: Map<string, PagedList<GarbageStation>> = new Map();

  constructor(
    private _eventRequest: EventRequestService,
    private _garbageStationRequest: GarbageStationRequestService,
    private _converter: IllegalDropEventConverter
  ) {}
  async init(searchInfo: IllegalDropEventSearchInfo) {
    let { Data, Page } = await this._listEventRecords(searchInfo);

    await this._converter.getAllCounty(); //  一定要等 County Division 注册后再 iterateToModel
    let data = await this._converter.iterateToModel(Data);
    data = data.sort((a, b) => {
      return LocaleCompare.compare(a.EventTime, b.EventTime);
    });

    let res: PagedList<IllegalDropEventModel> = {
      Page: Page,
      Data: data,
    };

    return res;
  }
  private _listEventRecords(searchInfo: IllegalDropEventSearchInfo) {
    let params = new GetEventRecordsParams();
    params.PageIndex = searchInfo.PageIndex;
    params.PageSize = searchInfo.PageSize;
    params.BeginTime = searchInfo.BeginTime;
    params.EndTime = searchInfo.EndTime;

    params.DivisionIds = searchInfo.DivisionIds;

    if (searchInfo.StationId) params.StationIds = [searchInfo.StationId];
    if (searchInfo.CameraId) params.ResourceIds = [searchInfo.CameraId];

    switch (searchInfo.SearchConditionKey) {
      case SearchConditionKey.StationName:
        params.StationName = searchInfo.Condition;
        break;
      case SearchConditionKey.CommunityName:
        params.CommunityName = searchInfo.Condition;
        break;
    }

    return this._eventRequest.record.IllegalDrop.list(params);
  }

  // 区划多选树
  async listTotalStations(searchInfo: IllegalDropEventSearchInfo) {
    let res: PagedList<GarbageStation> = {
      Page: {
        PageIndex: 1,
        PageSize: 99999,
        PageCount: 1,
        RecordCount: 0,
        TotalRecordCount: 0,
      },
      Data: [],
    };

    if (searchInfo.DivisionIds.length) {
      let arr: Promise<PagedList<GarbageStation>>[] = [];
      for (let i = 0; i < searchInfo.DivisionIds.length; i++) {
        let divisionId = searchInfo.DivisionIds[i];
        arr.push(this._listStation(divisionId));
      }
      let conjuction = await Promise.all(arr);
      console.log(conjuction);
      conjuction.reduce((prev, cur) => {
        prev.Data.push(...cur.Data);
        prev.Page.RecordCount += cur.Page.RecordCount;
        prev.Page.TotalRecordCount += cur.Page.TotalRecordCount;
        return prev;
      }, res);
    } else {
      res = await this._listStation('');
    }

    // console.log(res);

    return res;
  }

  private async _listStation(divisionId: string) {
    let res: PagedList<GarbageStation>;
    if (this._stationMap.has(divisionId)) {
      res = this._stationMap.get(divisionId)!;
    } else {
      let params = new GetGarbageStationsParams();
      // 空字符串和undefined结果一致
      if (divisionId) params.DivisionId = divisionId;
      res = await this._garbageStationRequest.list(params);
      this._stationMap.set(divisionId, res);
    }

    return res;
  }
}

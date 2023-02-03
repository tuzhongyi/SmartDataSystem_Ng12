import { Injectable } from '@angular/core';
import { count } from 'console';
import { IllegalDropEventConverter } from 'src/app/common/components/illegal-drop-event/illegal-drop-event.converter';
import { PagedList } from 'src/app/network/model/page_list.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetEventRecordsParams } from 'src/app/network/request/event/event-request.params';
import { EventRequestService } from 'src/app/network/request/event/event-request.service';
import {
  IllegalDropEventModel,
  IllegalDropEventSearchInfo,
} from 'src/app/common/components/illegal-drop-event/illegal-drop-event.model';
import { LocaleCompare } from '../../tools/locale-compare';

@Injectable()
export class IllegalDropEventBusiness {
  private _divisionMap = new Map<string, string>();

  constructor(
    private _eventRequest: EventRequestService,
    private _divisionRequest: DivisionRequestService,
    private _converter: IllegalDropEventConverter
  ) {}
  async init(searchInfo: IllegalDropEventSearchInfo) {
    let { Data, Page } = await this._listEventRecords(searchInfo);

    // console.log(Data);

    //  一定要等 County Division 注册后再 iterateToModel
    await this._converter.getAllCounty();
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

    if (!searchInfo.Filter) {
      params.BeginTime = searchInfo.BeginTime;
      params.EndTime = searchInfo.EndTime;
      params.ResourceName = searchInfo.Condition;
      params.DivisionIds = searchInfo.DivisionIds;
    } else {
      params.BeginTime = searchInfo.BeginTime;
      params.EndTime = searchInfo.EndTime;
      params.DivisionIds = searchInfo.DivisionIds;
      params.StationIds = searchInfo.StationIds;
      params.ResourceIds = searchInfo.CameraIds;
    }

    return this._eventRequest.record.IllegalDrop.list(params);
  }
  private _getDivision(id: string) {
    return this._divisionRequest.get(id);
  }
  private _register(id: string, name: string) {
    this._divisionMap.set(id, name);
  }
}

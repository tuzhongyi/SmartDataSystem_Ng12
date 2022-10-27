import { Injectable } from '@angular/core';
import { count } from 'console';
import { IllegalDropEventConverter } from 'src/app/converter/illegal-drop-event.converter';
import { PagedList } from 'src/app/network/model/page_list.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetEventRecordsParams } from 'src/app/network/request/event/event-request.params';
import { EventRequestService } from 'src/app/network/request/event/event-request.service';
import {
  IllegalDropEventModel,
  IllegalDropEventSearchInfo,
} from 'src/app/view-model/illegal-drop-event.model';
import { LocaleCompare } from '../../tools/locale-compare';

@Injectable()
export class IllegalDropEventBusiness {
  private _divisionMap = new Map<string, string>();

  constructor(
    private _eventRequest: EventRequestService,
    private _divisionRequest: DivisionRequestService,
    private _converter: IllegalDropEventConverter
  ) {}
  async init(
    searchInfo: IllegalDropEventSearchInfo,
    pageIndex: number = 1,
    pageSize: number = 9
  ) {
    let params = new GetEventRecordsParams();
    params.PageIndex = pageIndex;
    params.PageSize = pageSize;

    if (!searchInfo.Filter) {
      params.BeginTime = searchInfo.BeginTime;
      params.EndTime = searchInfo.EndTime;
      params.ResourceName = searchInfo.Condition;
    } else {
      params.BeginTime = searchInfo.BeginTime;
      params.EndTime = searchInfo.EndTime;
      params.DivisionIds = searchInfo.DivisionIds;
      params.StationIds = searchInfo.StationIds;
      params.ResourceIds = searchInfo.CameraIds;
    }

    let tmp = await this._listEventRecords(params);

    // console.log(tmp);
    let data = await this._converter.iterateToModel(tmp.Data);
    data = data.sort((a, b) => {
      return LocaleCompare.compare(a.EventTime, b.EventTime);
    });

    for (let i = 0; i < data.length; i++) {
      let model = data[i];
      if (model.CommitteeId) {
        let division = await this._getDivision(model.CommitteeId);
        // console.log(division);
        if (division.ParentId) {
          model.CountyId = division.ParentId;

          if (this._divisionMap.has(division.ParentId)) {
            model.CountyName = this._divisionMap.get(division.ParentId)!;
          } else {
            let county = await this._getDivision(division.ParentId);
            this._divisionMap.set(county.Id, county.Name);
            model.CountyName = county.Name;
          }
        }
      }
    }

    let res: PagedList<IllegalDropEventModel> = {
      Page: tmp.Page,
      Data: data,
    };

    return res;
  }
  private _listEventRecords(params: GetEventRecordsParams) {
    return this._eventRequest.record.IllegalDrop.list(params);
  }
  private _getDivision(id: string) {
    return this._divisionRequest.get(id);
  }
  private _register(id: string, name: string) {
    this._divisionMap.set(id, name);
  }
}

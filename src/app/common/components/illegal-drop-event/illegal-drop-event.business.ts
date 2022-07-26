import { Injectable } from "@angular/core";
import { IllegalDropEventConverter } from "src/app/converter/illegal-drop-event.converter";
import { PagedList } from "src/app/network/model/page_list.model";
import { DivisionRequestService } from "src/app/network/request/division/division-request.service";
import { GetEventRecordsParams } from "src/app/network/request/event/event-request.params";
import { EventRequestService } from "src/app/network/request/event/event-request.service";
import { IllegalDropEventModel, IllegalDropEventSearchInfo } from "src/app/view-model/illegal-drop-event.model";
import { LocaleCompare } from "../../tools/locale-compare";

@Injectable()
export class IllegalDropEventBusiness {
  constructor(private _eventRequest: EventRequestService, private _converter: IllegalDropEventConverter) {

  }
  async init(searchInfo: IllegalDropEventSearchInfo, pageIndex: number = 1, pageSize: number = 9) {
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
    let data = await this._converter.iterateToModel(tmp.Data);
    data = data.sort((a, b) => {
      return LocaleCompare.compare(a.EventTime, b.EventTime)
    })

    let res: PagedList<IllegalDropEventModel> = {
      Page: tmp.Page,
      Data: data,
    };

    return res;
  }
  private _listEventRecords(params: GetEventRecordsParams) {
    return this._eventRequest.record.IllegalDrop.list(params)
  }
}
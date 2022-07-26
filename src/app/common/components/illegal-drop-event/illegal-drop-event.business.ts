import { Injectable } from "@angular/core";
import { DivisionRequestService } from "src/app/network/request/division/division-request.service";
import { GetEventRecordsParams } from "src/app/network/request/event/event-request.params";
import { EventRequestService } from "src/app/network/request/event/event-request.service";
import { Time } from "../../tools/time";

@Injectable()
export class IllegalDropEventBusiness {
  constructor(private _divisionRequest: DivisionRequestService, private _eventRequest: EventRequestService) {

  }
  init() {
    let params = new GetEventRecordsParams();
    params.BeginTime = Time.beginTime(new Date());
    params.EndTime = new Date();
    params.DivisionIds = ['310115137000'];
    params.PageIndex = -1;
    params.PageSize = 9;
    params.ResourceName = '';
    return this._eventRequest.record.IllegalDrop.list(params)
  }
}
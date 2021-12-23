import { Injectable } from '@angular/core';
import { Time } from 'src/app/global/tool/time';
import { GetEventRecordsParams } from 'src/app/network/request/event/event-request.params';
import { EventRequestService } from 'src/app/network/request/event/event-request.service';

@Injectable()
export class IllegalDropBusiness {
  constructor(private _eventRequestService: EventRequestService) {}
  async loadData() {
    let params = new GetEventRecordsParams();
    params.PageSize = 9;
    let beginTime = Time.beginTime(new Date());
    let endTime = Time.endTime(new Date());
    params.BeginTime = beginTime;
    params.EndTime = endTime;

    let res = await this._eventRequestService.record.IllegalDrop.list(params);
    console.log(res);
  }
}

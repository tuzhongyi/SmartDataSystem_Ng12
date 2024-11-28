import { IEventRecord } from 'src/app/network/model/garbage-station/event-record/garbage-event-record.model';
import { GarbageFullEventRecord } from 'src/app/network/model/garbage-station/event-record/garbage-full-event-record.model';
import { Page } from 'src/app/network/model/page_list.model';
import { GetEventRecordGarbageFullParams } from 'src/app/network/request/event/event-request-garbage-full.params';
import { EventRequestService } from 'src/app/network/request/event/event-request.service';
import { Paged } from 'src/app/view-model/paged.model';

export class EventHandleCompleteGarbageFullService {
  constructor(public service: EventRequestService) {}

  async list(page: Page, record: IEventRecord) {
    let params = new GetEventRecordGarbageFullParams();
    params.BeginTime = record.EventTime;
    params.EndTime = record.EventTime;
    params.PageSize = 1;
    params.PageIndex = page.PageIndex;
    let res = await this.service.record.GarbageFull.list(params);
    if (res.Data && res.Data.length > 0) {
      let paged = new Paged<GarbageFullEventRecord>();
      paged.Page = res.Page;
      paged.Data = res.Data[0];
      return paged;
    }
    throw new Error('No data found');
  }
}

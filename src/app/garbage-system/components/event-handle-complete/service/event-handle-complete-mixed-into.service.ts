import { IEventRecord } from 'src/app/network/model/garbage-station/event-record/garbage-event-record.model';
import { MixedIntoEventRecord } from 'src/app/network/model/garbage-station/event-record/mixed-into-event-record.model';
import { Page } from 'src/app/network/model/page_list.model';
import { GetEventRecordMixedIntoParams } from 'src/app/network/request/event/event-request-mixed-info.params';
import { EventRequestService } from 'src/app/network/request/event/event-request.service';
import { Paged } from 'src/app/view-model/paged.model';

export class EventHandleCompleteMixedIntoService {
  constructor(public service: EventRequestService) {}

  async list(page: Page, record: IEventRecord) {
    let params = new GetEventRecordMixedIntoParams();
    params.BeginTime = record.EventTime;
    params.EndTime = record.EventTime;
    params.PageSize = 1;
    params.PageIndex = page.PageIndex;
    let res = await this.service.record.MixedInto.list(params);
    if (res.Data && res.Data.length > 0) {
      let paged = new Paged<MixedIntoEventRecord>();
      paged.Page = res.Page;
      paged.Data = res.Data[0];
      return paged;
    }
    throw new Error('No data found');
  }
}

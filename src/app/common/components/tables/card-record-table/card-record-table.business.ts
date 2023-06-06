import { Injectable } from '@angular/core';
import { EventRecord } from 'src/app/network/model/event-record.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetEventRecordsParams } from 'src/app/network/request/event/event-request.params';
import { EventRequestService } from 'src/app/network/request/event/event-request.service';

import { CardRecordTableArgs } from './card-record-table.model';

@Injectable()
export class CardRecordTableBusiness {
  constructor(private service: EventRequestService) {}
  async load(
    index: number,
    size: number = 10,
    args: CardRecordTableArgs
  ): Promise<PagedList<EventRecord>> {
    let data = await this.getData(index, size, args);
    return data;
  }
  getData(
    index: number,
    size: number = 10,
    args: CardRecordTableArgs
  ): Promise<PagedList<EventRecord>> {
    let params = new GetEventRecordsParams();
    params.PageIndex = index;
    params.PageSize = size;
    params.BeginTime = args.duration.begin;
    params.EndTime = args.duration.end;
    if (args.stationId) {
      params.StationIds = [args.stationId];
    }
    return this.service.record.MixedInto.list(params);
  }
}

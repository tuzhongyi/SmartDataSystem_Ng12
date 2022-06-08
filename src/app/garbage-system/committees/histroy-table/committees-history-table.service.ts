import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { EventType } from 'src/app/enum/event-type.enum';
import {
  IllegalDropEventRecord,
  MixedIntoEventRecord,
} from 'src/app/network/model/event-record.model';
import { GetEventRecordsParams } from 'src/app/network/request/event/event-request.params';
import { EventRequestService } from 'src/app/network/request/event/event-request.service';
import { IntervalParams } from 'src/app/network/request/IParams.interface';
import { CommitteesHistoryTableConverter } from './committees-history-table.converter';
import { CommitteesHistoryTableViewModel } from './committees-history-table.model';

@Injectable()
export class CommitteesHistroyTableService
  implements
    IBusiness<
      Array<IllegalDropEventRecord | MixedIntoEventRecord>,
      CommitteesHistoryTableViewModel<
        IllegalDropEventRecord | MixedIntoEventRecord
      >[]
    >
{
  constructor(private eventService: EventRequestService) {}
  Converter: IConverter<
    (IllegalDropEventRecord | MixedIntoEventRecord)[],
    CommitteesHistoryTableViewModel<
      IllegalDropEventRecord | MixedIntoEventRecord
    >[]
  > = new CommitteesHistoryTableConverter();
  subscription?: ISubscription | undefined;
  loading?: EventEmitter<void> | undefined;
  async getData(divisionId: string, eventType: EventType): Promise<any[]> {
    let day = IntervalParams.allDay(new Date());
    let params = new GetEventRecordsParams();
    params.BeginTime = day.BeginTime;
    params.EndTime = day.EndTime;
    params.DivisionIds = [divisionId];

    let service = this.getService(eventType);
    let paged = await service.list(params);
    return paged.Data;
  }

  async load(divisionId: string, eventType: EventType) {
    let data = await this.getData(divisionId, eventType);
    let model = this.Converter.Convert(data);
    let i = 0;
    model = model.sort((a, b) => {
      return b.Time.localeCompare(a.Time);
    });
    model.forEach((x) => {
      x.Index = ++i;
    });
    return model;
  }

  getService(eventType: EventType) {
    switch (eventType) {
      case EventType.MixedInto:
        return this.eventService.record.MixedInto;
      case EventType.IllegalDrop:
      default:
        return this.eventService.record.IllegalDrop;
    }
  }
}

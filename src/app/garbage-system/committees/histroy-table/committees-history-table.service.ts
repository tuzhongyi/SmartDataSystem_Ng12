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
} from 'src/app/network/model/garbage-event-record.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetEventRecordsParams } from 'src/app/network/request/event/event-request.params';
import { EventRequestService } from 'src/app/network/request/event/event-request.service';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { DurationParams } from 'src/app/network/request/IParams.interface';
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
  constructor(
    private eventService: EventRequestService,
    private stationService: GarbageStationRequestService,
    private divisionService: DivisionRequestService
  ) {}
  Converter: IPromiseConverter<
    (IllegalDropEventRecord | MixedIntoEventRecord)[],
    CommitteesHistoryTableViewModel<
      IllegalDropEventRecord | MixedIntoEventRecord
    >[]
  > = new CommitteesHistoryTableConverter();
  subscription?: ISubscription | undefined;
  loading?: EventEmitter<void> | undefined;
  async getData(divisionId: string, eventType: EventType): Promise<any[]> {
    let day = DurationParams.allDay(new Date());
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
    let model = await this.Converter.Convert(data, {
      station: (id: string) => {
        return this.stationService.cache.get(id);
      },
      division: (id: string) => {
        return this.divisionService.cache.get(id);
      },
      camera: (stationId: string, cameraId: string) => {
        return this.stationService.camera.get(stationId, cameraId);
      },
    });
    let i = 0;
    model = model.sort((a, b) => {
      return b.DateFormatter.localeCompare(a.DateFormatter);
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

import { Injectable } from '@angular/core';
import { EventType } from 'src/app/enum/event-type.enum';
import { IEventRecord } from 'src/app/network/model/garbage-station/event-record/garbage-event-record.model';
import { EventHandleCompleteConverter } from './converter/event-handle-complete.converter';
import { EventHandleCompleteArgs } from './event-handle-complete.model';
import { EventHandleCompleteService } from './service/event-handle-complete.service';

@Injectable()
export class EventHandleCompleteBusiness {
  constructor(
    private service: EventHandleCompleteService,
    private converter: EventHandleCompleteConverter
  ) {}
  async load(args: IEventRecord) {
    // let data = await this.getData(args);
    let model = this.converter.convert(args);
    return model;
  }
  getData(args: EventHandleCompleteArgs) {
    switch (args.type) {
      case EventType.GarbageFull:
        return this.service.event.full.list(args.page, args.data);
      case EventType.MixedInto:
        return this.service.event.mixed.list(args.page, args.data);
      case EventType.GarbageDrop:
      case EventType.GarbageDropSuperTimeout:
      case EventType.GarbageDropTimeoutHandle:
      case EventType.GarbageDropTimeout:
      case EventType.GarbageDropHandle:
        return this.service.event.drop.list(args.page, args.data);
      default:
        throw new Error('Method not implemented.');
    }
  }
}

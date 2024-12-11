import { EventType } from 'src/app/enum/event-type.enum';
import { IEventRecord } from 'src/app/network/model/garbage-station/event-record/garbage-event-record.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { Page } from 'src/app/network/model/page_list.model';
import { ImageControlModel } from 'src/app/view-model/image-control.model';

export class EventHandleCompleteArgs<T = any> {
  type = EventType.None;
  page = new Page();
  data!: IEventRecord<T>;
}

export class EventRecordCompleteModel<T = any> {
  Record!: IEventRecord<T>;
  GarbageStation!: Promise<GarbageStation>;
  Items: EventHandleCompleteModel[] = [];
  RecordNo!: string;
  Duration!: { begin: Date; end?: Date };
}
export class EventHandleCompleteModel {
  Time!: Date;
  Index!: number;
  Title!: string;
  Type!: EventHandleCompleteModelType;
  urls: ImageControlModel[] = [];
  Minitues?: number;
  top = false;
  bottom = false;
  left = false;
  TitleColor!: string;
  infos: string[] = [];
}

export interface EventHandleCompleteImageArgs {
  model: EventHandleCompleteModel;
  index: number;
}

export enum EventHandleCompleteModelType {
  event,
  timeout,
  handle,
}

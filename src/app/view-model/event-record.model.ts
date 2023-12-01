import { BaseEventRecord } from '../network/model/garbage-station/event-record/garbage-event-record.model';
import { GarbageStationModel } from './garbage-station.model';
import { ImageControlModel } from './image-control.model';

export class EventRecordViewModel<T = any> extends BaseEventRecord {
  Data!: T;

  /** */
  GarbageStation?: GarbageStationModel;

  DateFormatter: string = '';
  ProcessorName?: string;
  ProcessTime?: Date;
  images: ImageControlModel[] = [];
  urls: Promise<string>[] = [];
}

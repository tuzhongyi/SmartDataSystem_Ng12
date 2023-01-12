import { ImageControlModel } from './image-control.model';
import { GarbageStationModel } from './garbage-station.model';
import { BaseEventRecord } from '../network/model/garbage-event-record.model';

export class EventRecordViewModel<T = any> extends BaseEventRecord {
  Data!: T;

  /** */
  GarbageStation?: GarbageStationModel;

  DateFormatter: string = '';

  images: ImageControlModel[] = [];
}

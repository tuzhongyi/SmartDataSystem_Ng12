import {
  GarbageDropEventData,
  GarbageDropEventRecord,
} from 'src/app/network/model/event-record.model';
import { ImageControlModel } from '../../image-control/image-control.model';
import {
  EventRecordFilter,
  EventRecordViewModel,
} from '../event-record-table/event-record.model';

export class GarbageDropRecordViewModel extends GarbageDropEventRecord {
  images: ImageControlModel[] = [];

  DateFormatter: string = '';

  SendTime: string = '';
  HandleTime: string = '-';

  DropDuration?: string = '-';

  status: string = '';
  statusClass: string = '';
}

export class GarbageDropRecordFilter extends EventRecordFilter {
  IsHandle?: boolean;
  IsTimeout?: boolean;
}

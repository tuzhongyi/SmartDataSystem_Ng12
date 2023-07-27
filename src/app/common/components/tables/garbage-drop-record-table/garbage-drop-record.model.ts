import { CompareRange } from 'src/app/network/model/compare-range.model';
import { Division } from 'src/app/network/model/division.model';
import { GarbageDropEventRecord } from 'src/app/network/model/garbage-event-record.model';
import { ImageControlModel } from '../../../../view-model/image-control.model';
import { EventRecordFilter } from '../event-record/event-record.model';

export class GarbageDropRecordViewModel extends GarbageDropEventRecord {
  images: ImageControlModel[] = [];

  DateFormatter: string = '';

  SendTime: string = '';
  HandleTime: string = '-';

  DropDuration?: string = '-';

  status: string = '';
  statusClass: string = '';

  Committees?: Division;
  County?: Division;
}

export class GarbageDropRecordFilter extends EventRecordFilter {
  constructor() {
    super();
  }
  IsHandle?: boolean;
  IsTimeout?: boolean;
  range?: CompareRange<number>;
}

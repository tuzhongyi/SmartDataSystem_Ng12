import { CompareRange } from 'src/app/network/model/garbage-station/compare-range.model';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { GarbageDropEventRecord } from 'src/app/network/model/garbage-station/event-record/garbage-drop-event-record.model';
import { EventRecordFilter } from '../event-record/event-record.model';

export class GarbageDropRecordViewModel extends GarbageDropEventRecord {
  DateFormatter: string = '';

  SendTime: string = '';
  HandleTime: string = '-';

  DropDuration?: string = '-';

  status: string = '';
  statusClass: string = '';

  Committees!: Promise<Division>;
  County!: Promise<Division>;
  urls!: Promise<string[]>;
}

export class GarbageDropRecordFilter extends EventRecordFilter {
  constructor() {
    super();
  }
  IsHandle?: boolean;
  IsTimeout?: boolean;
  range?: CompareRange<number>;
}

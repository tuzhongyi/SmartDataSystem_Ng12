import { CompareRange } from 'src/app/network/model/garbage-station/compare-range.model';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { GarbageDropEventRecord } from 'src/app/network/model/garbage-station/event-record/garbage-drop-event-record.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { EventRecordFilter } from '../event-record/event-record.model';

export class GarbageDropRecordViewModel extends GarbageDropEventRecord {
  DateFormatter: string = '';

  SendTime: string = '';
  SendFullTime = '';
  HandleTime: string = '-';
  HandleFullTime = '';

  DropDuration?: string = '-';

  status: string = '';
  statusClass: string = '';

  Committees!: Promise<Division>;
  County!: Promise<Division>;
  urls!: Promise<string[]>;
  GarbageStation!: Promise<GarbageStation>;
}

export class GarbageDropRecordFilter extends EventRecordFilter {
  constructor() {
    super();
  }
  IsHandle?: boolean;
  IsTimeout?: boolean;
  range?: CompareRange<number>;
}

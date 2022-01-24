import { Division } from 'src/app/network/model/division.model';
import { EventRecord } from 'src/app/network/model/event-record.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { Page } from 'src/app/network/model/page_list.model';
import { IntervalParams } from 'src/app/network/request/IParams.interface';
import { SelectItem } from '../../select-control/select-control.model';

export class EventRecordViewModel extends EventRecord {
  /** */
  GarbageStation?: GarbageStation;
  /** */
  Committees?: Division;
  /** */
  County?: Division;
  /** */
  City?: Division;

  imageSrc: string = '';

  DateFormatter: string = '';
}

export class EventRecordFilter {
  constructor(begin: Date, end: Date) {
    this.begin = begin;
    this.end = end;
  }
  begin: Date;
  end: Date;
  division?: SelectItem;
  station?: SelectItem;
  camera?: SelectItem;
  text?: string;
}

import { Division } from 'src/app/network/model/division.model';
import { EventRecord } from 'src/app/network/model/event-record.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { Page } from 'src/app/network/model/page_list.model';
import { IntervalParams } from 'src/app/network/request/IParams.interface';
import { ImageControlModel } from '../../image-control/image-control.model';
import { SelectItem } from '../../select-control/select-control.model';
import { GarbageStationModel } from '../garbage-station-table/garbage-station.model';

export class EventRecordViewModel extends EventRecord {
  /** */
  GarbageStation?: GarbageStationModel;

  imageSrc: string = '';

  DateFormatter: string = '';

  images: ImageControlModel[] = [];
}

export class EventRecordFilter {
  constructor(begin?: Date, end?: Date) {
    let now = new Date();
    if (begin) {
      this.begin = begin;
    } else {
      this.begin = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }
    if (end) {
      this.end = end;
    } else {
      this.end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      this.end.setMilliseconds(-1);
    }
  }
  begin: Date;
  end: Date;
  division?: SelectItem;
  station?: SelectItem;
  camera?: SelectItem;
  text?: string;
  community?: SelectItem;
}

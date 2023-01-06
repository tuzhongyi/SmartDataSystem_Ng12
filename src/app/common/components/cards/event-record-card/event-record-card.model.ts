import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';

export class EventRecordCardModel<T = any> {
  constructor(source?: T) {
    this.source = source;
  }
  id: string = '';
  name: string = '';
  time: Date = new Date();
  img?: Promise<string>;
  parent?: Division;
  station?: GarbageStation;
  source?: T;
}

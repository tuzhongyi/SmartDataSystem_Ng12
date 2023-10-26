import { EventEmitter } from '@angular/core';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';

export class DapuqiaoGarbageStationWindowRecordModel {
  division = new Selection<Division>();
  station = new Selection<GarbageStation>();
}

class Selection<T> {
  datas: T[] = [];

  select: EventEmitter<T> = new EventEmitter();

  private _selected?: T;
  public get selected(): T | undefined {
    return this._selected;
  }
  public set selected(v: T | undefined) {
    this._selected = v;
    this.select.emit(v);
  }
}

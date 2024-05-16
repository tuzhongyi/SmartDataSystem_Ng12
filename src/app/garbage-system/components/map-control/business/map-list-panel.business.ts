import { EventEmitter, Injectable } from '@angular/core';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';

@Injectable()
export class ListPanelBusiness {
  show = false;
  itemSelected: EventEmitter<Division | GarbageStation> = new EventEmitter();
  load = new EventEmitter();
  istree = false;

  constructor() {}

  onselected(item: Division | GarbageStation) {
    this.itemSelected.emit(item);
  }
}

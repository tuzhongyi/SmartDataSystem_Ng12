import { EventEmitter } from '@angular/core';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';

export class MapControlToolButton {
  click: EventEmitter<void> = new EventEmitter();
  change: EventEmitter<boolean> = new EventEmitter();
  display: boolean = true;

  private _selected: boolean = false;
  public get selected(): boolean {
    return this._selected;
  }
  public set selected(v: boolean) {
    if (this._selected === v) return;
    this._selected = v;
    this.change.emit(this._selected);
  }
}

export class MapControlTools {
  status = true;
  videoList = false;
  videoControl = false;
}

class MapControlToolFilterButton {
  current = new MapControlToolButton();
  construction = new MapControlToolButton();
  station = new MapControlToolButton();
}
class MapControlTooDurationButton {
  current = new MapControlToolButton();
  station = new MapControlToolButton();
  all = new MapControlToolButton();
  m30 = new MapControlToolButton();
  h1 = new MapControlToolButton();
  h2 = new MapControlToolButton();
}

// class MapControlLabelDisplay {
//   constructor(
//     private events: {
//       current: (state: boolean) => void;
//       station: (state: boolean) => void;
//     }
//   ) {
//     this.station.onChange.subscribe((x) => {
//       events.station(x);
//     });
//   }

//   private _current: boolean = false;
//   public get current(): boolean {
//     return this._current;
//   }
//   public set current(v: boolean) {
//     this._current = v;
//     this.events.current(this._current);
//   }

//   station = new ChangeControlModel(true);
// }

export interface MapControlSelected {
  station?: GarbageStation;
}

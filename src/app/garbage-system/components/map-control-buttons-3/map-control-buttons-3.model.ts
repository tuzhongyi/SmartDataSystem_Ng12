import { EventEmitter } from '@angular/core';

class MapControlButton3 {
  constructor(selected: boolean) {
    this._selected = selected;
  }

  private _selected: boolean;
  public get selected(): boolean {
    return this._selected;
  }
  public set selected(v: boolean) {
    if (this._selected === v) return;
    this._selected = v;
    this.select.emit(v);
  }
  select: EventEmitter<boolean> = new EventEmitter();
}

export class MapControlButton3List {
  constructor() {
    this.regist();
  }
  filter = new MapControlFilterButton(false);
  private regist() {
    this.filter.select.subscribe((x) => {
      if (!x) {
        this.filter.state.selected = false;
        this.filter.type.selected = false;

        this.filter.type.station.selected = true;
        this.filter.type.rfid.selected = true;
        this.filter.type.construction.selected = true;

        this.filter.state.all.selected = false;
        this.filter.state.all.selected = true;
      }
    });
  }
}

class MapControlFilterButton extends MapControlButton3 {
  constructor(selected: boolean) {
    super(selected);
    this.regist();
  }
  type = new MapControlTypeButton(false);
  state = new MapControlStateButton(false);

  private regist() {
    this.type.select.subscribe((x) => {
      if (x) {
        this.state.selected = false;
      }
    });
    this.state.select.subscribe((x) => {
      if (x) {
        this.type.selected = false;
      } else {
        this.state.all.selected = true;
      }
    });
  }
}

class MapControlTypeButton extends MapControlButton3 {
  station = new MapControlButton3(true);
  rfid = new MapControlButton3(true);
  construction = new MapControlButton3(true);
}
class MapControlStateButton extends MapControlButton3 {
  constructor(selected: boolean) {
    super(selected);
    this.regist();
  }
  all = new MapControlButton3(true);
  normal = new MapControlButton3(true);
  full = new MapControlButton3(true);
  drop = new MapControlStateDropButton(true);
  error = new MapControlButton3(true);

  private regist() {
    this.all.select.subscribe((x) => {
      this.normal.selected = x;
      this.full.selected = x;
      this.drop.selected = x;
      this.error.selected = x;
    });
  }
}

class MapControlStateDropButton extends MapControlButton3 {
  constructor(selected: boolean) {
    super(selected);
    this.regist();
  }
  in30 = new MapControlButton3(false);
  out30 = new MapControlButton3(false);

  private regist() {
    this.select.subscribe((x) => {
      if (!x) {
        this.in30.selected = false;
        this.out30.selected = false;
      }
    });
  }
}

export enum MapControlButtonFilterType {
  station,
  rfid,
  construction,
}

export class MapControlButtonFilter {
  types: MapControlButtonFilterType[] = [
    MapControlButtonFilterType.station,
    MapControlButtonFilterType.rfid,
    MapControlButtonFilterType.construction,
  ];

  normal = true;
  full = true;
  drop = true;
  drop30in = false;
  drop30out = false;
  error = true;
}

import { EventEmitter } from '@angular/core';

export class MapControlButton2 {
  constructor(display: boolean, selected: boolean) {
    this.display = display;
    this._selected = selected;
  }
  display: boolean;

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

export class MapControlButtonItem extends MapControlButton2 {
  constructor(display: boolean, selected: boolean) {
    super(display, selected);
    this.select.subscribe((x) => {
      this.all.display = x;
      this.normal.display = x;
      this.full.display = x;
      this.drop.display = x;
      this.error.display = x;
    });
    this.all.select.subscribe((x) => {
      this.normal.selected = x;
      this.full.selected = x;
      this.drop.selected = x;
      this.error.selected = x;
    });
    this.drop.select.subscribe((x) => {
      if (x === false) {
        this.drop30in.selected = false;
        this.drop30out.selected = false;
      }
    });
    this.drop30in.select.subscribe((x) => {
      if (x) {
        this.drop.selected = true;
      }
    });
    this.drop30out.select.subscribe((x) => {
      if (x) {
        this.drop.selected = true;
      }
    });
  }
  all = new MapControlButton2(false, true);
  normal = new MapControlButton2(false, true);
  full = new MapControlButton2(false, true);
  drop = new MapControlButton2(false, true);
  drop30in = new MapControlButton2(false, false);
  drop30out = new MapControlButton2(false, false);
  error = new MapControlButton2(false, true);
}

export class MapControlButton2List {
  filter = new MapControlButton2(true, false);
  construction = new MapControlButtonItem(false, false);
  station = new MapControlButtonItem(false, false);
  rfid = new MapControlButtonItem(false, false);
}

import { EventEmitter } from '@angular/core';

export class MapControlButton {
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
    this._selected = v;
    this.select.emit(v);
  }
  select: EventEmitter<boolean> = new EventEmitter();
}
export class MapControlButtonList {
  filter = new MapControlButton(true, false);
  construction = new MapControlButton(false, true);
  stationnormal = new MapControlButton(false, true);
  stationfull = new MapControlButton(false, true);
  stationdrop = new MapControlButton(false, true);
  stationerror = new MapControlButton(false, true);
  station30in = new MapControlButton(false, false);
  station30out = new MapControlButton(false, false);
}

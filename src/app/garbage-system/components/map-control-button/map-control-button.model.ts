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
    if (this._selected === v) return;
    this._selected = v;
    this.select.emit(v);
  }
  select: EventEmitter<boolean> = new EventEmitter();
}

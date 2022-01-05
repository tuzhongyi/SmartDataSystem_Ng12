import { EventEmitter } from '@angular/core';
import { stat } from 'fs';

export class VisibilityModel {
  constructor(state: boolean = false) {
    this.state = state;
  }

  onChange: EventEmitter<boolean> = new EventEmitter();

  private _state: boolean = false;
  public get state(): boolean {
    return this._state;
  }
  public set state(v: boolean) {
    this._state = v;
    this.onChange.emit(this._state);
  }
}

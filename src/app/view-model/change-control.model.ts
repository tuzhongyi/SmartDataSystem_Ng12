import { EventEmitter } from '@angular/core';
import { stat } from 'fs';

export class ChangeControlModel<T> {
  constructor(value: T) {
    this._value = value;
    this.value = value;
  }

  onChange: EventEmitter<T> = new EventEmitter();

  private _value: T;
  public get value(): T {
    return this._value;
  }
  public set value(v: T) {
    this._value = v;
    if (this._value) {
      this.onChange.emit(this._value);
    } else {
      this.onChange.unsubscribe();
    }
  }
}

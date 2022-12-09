import { Injectable, InjectionToken } from '@angular/core';
import { GlobalStorageService } from '../../service/global-storage.service';
import { IToastWindowData } from './toast-window.model';

export const TOAST_WINDOW_TOKEN = new InjectionToken<IToastWindowData>(
  'TOAST_WINDOW_TOKEN'
);

@Injectable()
export class ToastWindowService {
  private _data: IToastWindowData | null = null;
  set data(value: IToastWindowData | null) {
    this._data = value;
  }
  get data() {
    return this._data;
  }

  constructor() {}

  reset() {
    this.data = null;
  }
}

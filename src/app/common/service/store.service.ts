import { EventEmitter, Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  statusChange = new EventEmitter();
  interval = new EventEmitter();
  refresh = new EventEmitter();

  public get loginPath(): string {
    return this.local.loginPath;
  }
  public set loginPath(v: string) {
    this.local.loginPath = v;
  }

  password?: string;

  HideButton: boolean = false;
  HideTitlebar: boolean = false;

  private _divisionId: string = '';
  private _divisionType: DivisionType = DivisionType.None;

  set divisionId(id: string) {
    this._divisionId = id;
  }
  get divisionId(): string {
    if (!this._divisionId) {
      if (this.local.user.Resources && this.local.user.Resources.length > 0) {
        this._divisionId = this.local.user.Resources[0].Id;
      }
    }
    return this._divisionId;
  }
  set divisionType(type: DivisionType) {
    this._divisionType = type;
  }
  get divisionType() {
    if (!this._divisionType) {
      if (this.local.user.Resources && this.local.user.Resources.length > 0) {
        this._divisionType = EnumHelper.ConvertUserResourceToDivision(
          this.local.user.Resources[0].ResourceType
        );
      }
    }
    return this._divisionType;
  }
  private _defaultDivisionId: string = '';
  get defaultDivisionId(): string {
    if (!this._defaultDivisionId) {
      if (this.local.user.Resources && this.local.user.Resources.length > 0) {
        this._defaultDivisionId = this.local.user.Resources[0].Id;
      }
    }
    return this._defaultDivisionId;
  }

  statistic = {
    illegalDrop: 0,
    mixedInto: 0,
    full: 0,
    station: {
      count: 0,
      drop: 0,
    },
    device: {
      count: 0,
      online: 0,
      offline: 0,
    },
  };

  private intervalHandle?: NodeJS.Timer;
  runInterval(interval: number = 1000 * 60 * 1) {
    this.intervalHandle = setInterval(() => {
      this.interval.emit();
    }, interval);
  }
  stopInterval() {
    if (this.intervalHandle) {
      clearInterval(this.intervalHandle);
    }
  }

  constructor(private local: LocalStorageService) {
    this.runInterval();
  }

  clear() {
    this.stopInterval();
    this._divisionId = '';
    this._divisionType = DivisionType.None;
    this.password = undefined;
    this.interval.unsubscribe();
    this.statusChange.unsubscribe();
    this.refresh.unsubscribe();

    this.interval = new EventEmitter();
    this.statusChange = new EventEmitter();
    this.refresh = new EventEmitter();
  }
}

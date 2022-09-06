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

  interval = new EventEmitter();
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

  refresh = new EventEmitter();

  constructor(private local: LocalStorageService) {
    this.runInterval();
  }
}

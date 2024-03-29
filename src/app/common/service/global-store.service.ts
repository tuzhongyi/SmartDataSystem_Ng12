import { EventEmitter, Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalStoreService {
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
    return this._divisionId;
  }
  set divisionType(type: DivisionType) {
    this._divisionType = type;
  }
  get divisionType() {
    return this._divisionType;
  }


  private _defaultDivisionType: DivisionType = DivisionType.None;
  public get defaultDivisionType() {
    if (this._defaultDivisionType == DivisionType.None) {
      let user = this.localStorage.user;
      let type = user.Resources && user.Resources.length > 0 ? user.Resources[0].ResourceType : undefined;
      if (type)
        this._defaultDivisionType = EnumHelper.ConvertUserResourceToDivision(
          type
        );
    }
    return this._defaultDivisionType;
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

  constructor(private localStorage: LocalStorageService) {
    this.runInterval();
  }
}

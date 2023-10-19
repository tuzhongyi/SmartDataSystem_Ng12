import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { wait } from '../tools/tool';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalStorageService {
  system?: SystemType; // 垃圾清运
  collectionStatusChange = new EventEmitter();

  statusChange = new EventEmitter();

  password?: string;

  HideButton: boolean = false;
  HideTitlebar: boolean = false;

  private _divisionId?: string;
  private _divisionType: DivisionType = DivisionType.None;

  set divisionId(id: string) {
    this._divisionId = id;
  }
  get divisionId(): string {
    return this._divisionId ?? '';
  }
  set divisionType(type: DivisionType) {
    this._divisionType = type;
  }
  get divisionType() {
    return this._divisionType;
  }
  private _defaultResourceType: UserResourceType = UserResourceType.None;
  public get defaultResourceType() {
    if (this._defaultResourceType == UserResourceType.None) {
      let user = this.localStorage.user;
      this._defaultResourceType =
        user.Resources && user.Resources.length > 0
          ? user.Resources[0].ResourceType
          : UserResourceType.None;
    }
    return this._defaultResourceType;
  }
  private _defaultDivisionType: DivisionType = DivisionType.None;
  public get defaultDivisionType() {
    if (this._defaultDivisionType == DivisionType.None) {
      let user = this.localStorage.user;
      let type =
        user.Resources && user.Resources.length > 0
          ? user.Resources[0].ResourceType
          : undefined;
      if (type)
        this._defaultDivisionType =
          EnumHelper.ConvertUserResourceToDivision(type);
    }
    return this._defaultDivisionType;
  }
  private _defaultDivisionId?: string;
  public get defaultDivisionId() {
    return new Promise<string>((resolve) => {
      if (this._defaultDivisionId) {
        resolve(this._defaultDivisionId);
        return;
      }
      wait(
        () => {
          return !!this.localStorage.user;
        },
        () => {
          let user = this.localStorage.user;
          let divisionId =
            user.Resources && user.Resources.length > 0
              ? user.Resources[0].Id
              : undefined;
          this._defaultDivisionId = divisionId;
          if (divisionId) {
            resolve(divisionId);
          }
        }
      );
    });
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

  interval = new IntervalController();

  constructor(private localStorage: LocalStorageService) {}

  destroy() {
    this.system = undefined;
    this.password = undefined;
    this._divisionId = undefined;
    this._divisionType = DivisionType.None;
    this._defaultDivisionId = undefined;
    this._defaultDivisionType = DivisionType.None;
    this._defaultResourceType = UserResourceType.None;
    this.interval.clear();
  }
}

class IntervalController {
  interval: { [key: string]: EventEmitter<void> } = {};
  private intervalHandle?: NodeJS.Timer;
  run(interval: number = 1000 * 60 * 1) {
    if (!this.intervalHandle) {
      this.intervalHandle = setInterval(() => {
        for (const key in this.interval) {
          this.interval[key].emit();
        }
      }, interval);
    }
  }
  stop() {
    if (this.intervalHandle) {
      clearInterval(this.intervalHandle);
      this.intervalHandle = undefined;
    }
  }
  clear() {
    this.stop();
    for (const key in this.interval) {
      this.unsubscribe(key);
    }
  }

  subscribe<T = any>(
    key: string,
    next?: (value: T) => void,
    error?: (error: any) => void,
    complete?: () => void
  ): Subscription;
  subscribe<T = any>(
    key: string,
    observerOrNext?: T,
    error?: T,
    complete?: T
  ): Subscription;
  subscribe<T = any>(key: string, observerOrNext?: T, error?: T, complete?: T) {
    let emitter = new EventEmitter();
    this.interval[key] = emitter;
    return this.interval[key].subscribe(observerOrNext, error, complete);
  }
  unsubscribe(key: string) {
    if (key in this.interval) {
      this.interval[key].unsubscribe();
      delete this.interval[key];
    }
  }
}

export enum SystemType {
  aiop,
  garbage,
  vehicle,
}

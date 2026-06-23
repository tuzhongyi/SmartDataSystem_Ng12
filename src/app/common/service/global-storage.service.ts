import { Injectable } from '@angular/core';
import { ConfigRequestService } from 'src/app/network/request/config/config-request.service';
import { GlobalStorageDivisionController } from './global-storage.service/global-storage-division.controller';
import { GlobalStorageIntervalController } from './global-storage.service/global-storage-interval.controller';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalStorageService {
  system?: SystemType; // 垃圾清运

  password?: string;

  HideButton: boolean = false;
  HideTitlebar: boolean = false;
  JustMap: boolean = false;

  division: GlobalStorageDivisionController;
  interval = new GlobalStorageIntervalController();

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

  private version = '1.0.0.5';

  constructor(
    private localStorage: LocalStorageService,
    private config: ConfigRequestService,
  ) {
    this.division = new GlobalStorageDivisionController(this.localStorage);
    this.init();
  }

  private init() {
    this.config.version.then((version) => {
      if (this.version !== version) {
        location.replace(window.location.href);
      }
    });
  }

  destroy() {
    this.system = undefined;
    this.password = undefined;
    this.division.clear();
    this.division = new GlobalStorageDivisionController(this.localStorage);
    this.interval.clear();
  }
}

export enum SystemType {
  aiop,
  garbage,
  vehicle,
}

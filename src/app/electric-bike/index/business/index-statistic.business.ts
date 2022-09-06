import { Injectable } from '@angular/core';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { WindowBussiness } from './window/index-window.business';

@Injectable()
export class ElectricBikeIndexDeviceStatisticBusiness {
  constructor(private window: WindowBussiness) {}

  onstatus(status?: OnlineStatus) {
    this.window.device.status = status;
    this.window.device.show = true;
  }
  onstation() {
    this.window.station.show = true;
  }
  onrecord() {
    this.window.record.show = true;
  }
}

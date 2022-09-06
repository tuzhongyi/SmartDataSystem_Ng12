import { Injectable } from '@angular/core';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { IDeviceStateDes } from 'src/app/view-model/device-state-count.model';
import { WindowBussiness } from './window/index-window.business';

@Injectable()
export class ElectricBikeIndexDeviceStatusBusiness {
  constructor(private window: WindowBussiness) {}

  onclick(status?: OnlineStatus) {
    this.window.device.status = status;
    this.window.device.show = true;
  }
}

import { Injectable } from '@angular/core';
import { IDeviceStateDes } from 'src/app/view-model/device-state-count.model';
import { MonitorWindowBussiness } from './window.business';

@Injectable()
export class MonitorDeviceStateBusiness {
  constructor(private window: MonitorWindowBussiness) {}

  onclick(args: IDeviceStateDes) {
    this.window.device.status = args.status;
    this.window.device.show = true;
  }
}

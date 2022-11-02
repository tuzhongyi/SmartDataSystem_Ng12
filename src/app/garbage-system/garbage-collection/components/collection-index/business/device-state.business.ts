import { Injectable } from '@angular/core';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { IDeviceStateDes } from 'src/app/view-model/device-state-count.model';
import { WindowBussiness } from './window.business';

@Injectable()
export class DeviceStateBusiness {
  constructor(private window: WindowBussiness) {}

  onclick(args: IDeviceStateDes) {
    this.window.device.status = args.status;
    this.window.device.show = true;
  }
}

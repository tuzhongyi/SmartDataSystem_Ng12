import { Injectable } from '@angular/core';
import { IDeviceStateDes } from 'src/app/view-model/device-state-count.model';
import { IndexWindowBussiness } from './index-window.business';

@Injectable()
export class IndexDeviceStateBusiness {
  constructor(private window: IndexWindowBussiness) {}

  onclick(args: IDeviceStateDes) {
    this.window.device.status = args.status;
    this.window.device.show = true;
  }
}

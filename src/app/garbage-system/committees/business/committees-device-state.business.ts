import { Injectable } from '@angular/core';
import { IDeviceStateDes } from 'src/app/view-model/device-state-count.model';
import { CommitteesWindowBussiness } from './committees-window.business';

@Injectable()
export class CommitteesDeviceStateBusiness {
  constructor(private window: CommitteesWindowBussiness) {}

  onclick(args: IDeviceStateDes) {
    this.window.device.status = args.status;
    this.window.device.show = true;
  }
}

import { Injectable } from '@angular/core';
import { DeviceViewModel } from 'src/app/common/components/tables/device-list-table/device.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { MonitorImageWindowBusiness } from './monitor-image-window.business';

@Injectable()
export class MonitorDeviceWindowBusiness extends WindowViewModel {
  constructor(private image: MonitorImageWindowBusiness) {
    super();
  }
  style = {
    height: '85%',
    width: '90%',
    transform: 'translate(-50%, -48%)',
  };
  status?: OnlineStatus;
  onimage(model: DeviceViewModel) {
    this.image.open(model);
  }
}

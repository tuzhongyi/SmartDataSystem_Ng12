import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { OnlineStatus } from 'src/app/enum/online-status.enum';

@Injectable()
export class DeviceWindowBusiness extends WindowViewModel {
  style = {
    height: '83%',
    transform: 'translate(-50%, -45%)',
  };
  status?: OnlineStatus;
}

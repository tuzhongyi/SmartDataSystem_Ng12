import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window/window.model';
import { OnlineStatus } from 'src/app/enum/online-status.enum';

class DeviceWindowViewModel extends WindowViewModel {
  onlineStatus?: OnlineStatus;
}

@Injectable()
export class WindowBussiness {
  device = new DeviceWindowViewModel();
}

import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window/window.model';
import { OnlineStatus } from 'src/app/enum/online-status.enum';

class DeviceWindowViewModel extends WindowViewModel {
  onlineStatus?: OnlineStatus;
}
class RecordWindowViewModel extends WindowViewModel {}

@Injectable()
export class WindowBussiness {
  constructor() {
    this.record.show = true;
  }
  device = new DeviceWindowViewModel();
  record = new RecordWindowViewModel();
}

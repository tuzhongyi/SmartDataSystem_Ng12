import { Injectable } from '@angular/core';
import { DeviceViewModel } from 'src/app/common/components/tables/device-list-table/device.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { ImageControlCreater } from 'src/app/converter/image-control.creater';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { AuditStatisticDataImageWindow } from './audit-statistic-data-image.window';

@Injectable()
export class AuditStatisticDataDeviceWindow extends WindowViewModel {
  constructor(private image: AuditStatisticDataImageWindow) {
    super();
  }
  style = { width: '80%', height: '818px' };
  status?: OnlineStatus;

  onimage(args: DeviceViewModel) {
    this.image.manualcapture = true;
    if (args instanceof DeviceViewModel) {
      this.image.index = 0;
      this.image.stationId = args.GarbageStationId;
      this.image.models = [ImageControlCreater.Create(args)];
    }
    this.image.show = true;
  }
}

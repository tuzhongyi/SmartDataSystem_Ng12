import { Injectable } from '@angular/core';
import { DeviceViewModel } from 'src/app/common/components/tables/device-list-table/device.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { ImageControlCreater } from 'src/app/converter/image-control.creater';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { IndexImageWindowBusiness } from './index-image-window.business';

@Injectable()
export class IndexDeviceWindowBusiness extends WindowViewModel {
  constructor(private image: IndexImageWindowBusiness) {
    super();
  }
  style = {
    height: '88%',
    width: '90%',
    transform: 'translate(-50%, -45%)',
  };
  status?: OnlineStatus;
  onimage(model: DeviceViewModel) {
    this.image.array.index = 0;
    this.image.array.stationId = model.GarbageStationId;
    this.image.array.manualcapture = true;
    this.image.array.models = [ImageControlCreater.Create(model)];
    this.image.array.show = true;
  }
}

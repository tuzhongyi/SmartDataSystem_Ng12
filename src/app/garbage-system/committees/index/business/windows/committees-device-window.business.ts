import { Injectable } from '@angular/core';
import { DeviceViewModel } from 'src/app/common/components/tables/device-list-table/device.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { ImageControlCreater } from 'src/app/converter/image-control.creater';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { CommitteesIndexImageWindowBusiness } from './committees-image-window.business';

@Injectable()
export class CommitteesDeviceWindowBusiness extends WindowViewModel {
  constructor(private image: CommitteesIndexImageWindowBusiness) {
    super();
  }
  style = {
    height: '83%',
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

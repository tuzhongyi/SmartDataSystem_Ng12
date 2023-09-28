import { Injectable } from '@angular/core';
import { DeviceViewModel } from 'src/app/common/components/tables/device-list-table/device.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { ImageControlModelArray } from 'src/app/view-model/image-control.model';
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
  onimage(item: DeviceViewModel) {
    this.image.array.index = 0;
    let img = new ImageControlModelArray([item.image], 0, item);
    this.image.array.models = img.models;

    if (img.models.length > 0) {
      this.image.array.current = img.models[0];
    }
    this.image.array.show = true;
  }
}

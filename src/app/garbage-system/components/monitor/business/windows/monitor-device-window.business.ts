import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { ImageControlModelArray } from 'src/app/view-model/image-control.model';
import { MonitorImageWindowBusiness } from './monitor-image-window.business';

@Injectable()
export class MonitorDeviceWindowBusiness extends WindowViewModel {
  constructor(private image: MonitorImageWindowBusiness) {
    super();
  }
  style = {
    height: '88%',
    width: '90%',
    transform: 'translate(-50%, -45%)',
  };
  status?: OnlineStatus;
  onimage(model: ImageControlModelArray) {
    this.image.array.index = model.index;
    if (model.models.length > 0) {
      this.image.array.stationId = model.models[0].stationId;
    }
    this.image.array.manualcapture = true;
    this.image.array.models = model.models;
    this.image.array.show = true;
  }
}

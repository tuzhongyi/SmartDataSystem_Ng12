import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { ImageControlModelArray } from 'src/app/view-model/image-control.model';
import { MonitorMediaWindowBusiness } from './monitor-media-window.business';

@Injectable()
export class MonitorDeviceWindowBusiness extends WindowViewModel {
  constructor(private media: MonitorMediaWindowBusiness) {
    super();
  }
  style = {
    height: '88%',
    width: '90%',
    transform: 'translate(-50%, -45%)',
  };
  status?: OnlineStatus;
  onimage(model: ImageControlModelArray) {
    this.media.single.camera = model.models;
    this.media.single.index = model.index;
    this.media.single.autoplay = model.autoplay;
    this.media.single;
    this.media.single.show = true;
  }
}

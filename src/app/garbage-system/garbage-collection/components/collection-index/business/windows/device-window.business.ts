import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { ImageControlModelArray } from 'src/app/view-model/image-control.model';
import { MediaWindowBusiness } from './media-window.business';

@Injectable()
export class DeviceWindowBusiness extends WindowViewModel {
  constructor(private media: MediaWindowBusiness) {
    super();
  }
  style = {
    height: '83%',
    width: '90%',
    transform: 'translate(-50%, -45%)',
  };
  status?: OnlineStatus;
  onimage(model: ImageControlModelArray) {
    this.media.single.camera = model.models;
    this.media.single.index = model.index;
    this.media.single.show = true;
  }
}

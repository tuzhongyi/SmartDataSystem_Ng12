import { Injectable } from '@angular/core';
import { ImageControlModelArray } from 'src/app/view-model/image-control.model';

import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { MonitorMediaWindowBusiness } from './monitor-media-window.business';

@Injectable()
export class MonitorGarbageStationFullWindowBusiness extends WindowViewModel {
  constructor(private media: MonitorMediaWindowBusiness) {
    super();
  }
  style = {
    height: '83.5%',
    width: '90%',
    transform: 'translate(-50%, -44.5%)',
  };

  eventCount = 0;

  onimage(model: ImageControlModelArray) {
    this.media.single.camera = model.models;
    this.media.single.index = model.index;
    this.media.single.autoplay = model.autoplay;
    this.media.single.show = true;
  }
}

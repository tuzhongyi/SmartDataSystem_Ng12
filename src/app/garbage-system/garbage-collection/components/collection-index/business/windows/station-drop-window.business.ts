import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';

import { GarbageDropStationWindowIndex } from 'src/app/garbage-system/components/windows/garbage-drop-window/garbage-drop-window.model';
import { ImageControlModelArray } from 'src/app/view-model/image-control.model';
import { MediaWindowBusiness } from './media-window.business';

@Injectable()
export class GarbageStationDropWindowBusiness extends WindowViewModel {
  constructor(private media: MediaWindowBusiness) {
    super();
  }
  divisionId?: string;

  index = GarbageDropStationWindowIndex.station;

  style = {
    height: '83.5%',
    width: '90%',
    transform: 'translate(-50%, -44.5%)',
  };

  onimage(model: ImageControlModelArray) {
    this.media.single.camera = model.models;
    this.media.single.index = model.index;
    this.media.single.show = true;
  }
}

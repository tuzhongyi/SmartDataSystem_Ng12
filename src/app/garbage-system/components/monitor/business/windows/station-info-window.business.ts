import { Injectable } from '@angular/core';
import {
  ImageControlModel,
  ImageControlModelArray,
} from 'src/app/common/components/image-control/image-control.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { GarbageStationWindowIndex } from '../../../windows/garbage-station-window/garbage-station-window.component';
import { MediaWindowBusiness } from './media-window.business';

@Injectable()
export class GarbageStationInfoWindowBusiness extends WindowViewModel {
  style = {
    height: '83.5%',
    width: '90%',
    transform: 'translate(-50%, -44.5%)',
  };

  index = GarbageStationWindowIndex.station;

  constructor(private media: MediaWindowBusiness) {
    super();
  }
  onimage(model: ImageControlModelArray) {
    this.media.camera = model.models;
    this.media.index = model.index;
    this.media.autoplay = model.autoplay;
    this.media.show = true;
  }
}

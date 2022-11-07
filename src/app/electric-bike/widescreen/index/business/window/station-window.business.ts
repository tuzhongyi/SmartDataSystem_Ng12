import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { StationState } from 'src/app/enum/station-state.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { ImageControlModelArray } from 'src/app/view-model/image-control.model';
import { MediaWindowBusiness } from './media-window.business';

@Injectable()
export class StationWindowBusiness extends WindowViewModel {
  constructor(private media: MediaWindowBusiness) {
    super();
  }
  style = {
    height: '83%',
    width: '45%',
    transform: 'translate(-50%, -45%)',
  };
  state?: StationState;

  onimage(model: ImageControlModelArray) {
    this.media.single.camera = model.models;
    this.media.single.index = model.index;
    this.media.single.autoplay = model.autoplay;
    this.media.single.show = true;
  }
}

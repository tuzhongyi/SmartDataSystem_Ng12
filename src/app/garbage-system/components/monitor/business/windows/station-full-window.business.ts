import { Injectable } from '@angular/core';
import {
  ImageControlModel,
  ImageControlModelArray,
} from 'src/app/common/components/image-control/image-control.model';
import { EventRecordViewModel } from 'src/app/common/components/tables/event-record-table/event-record.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { MediaWindowBusiness } from './media-window.business';

@Injectable()
export class GarbageStationFullWindowBusiness extends WindowViewModel {
  constructor(private media: MediaWindowBusiness) {
    super();
  }
  style = {
    height: '83.5%',
    width: '90%',
    transform: 'translate(-50%, -44.5%)',
  };

  eventCount = 0;

  onimage(model: ImageControlModelArray) {
    this.media.camera = model.models;
    this.media.index = model.index;
    this.media.autoplay = model.autoplay;
    this.media.show = true;
  }
}

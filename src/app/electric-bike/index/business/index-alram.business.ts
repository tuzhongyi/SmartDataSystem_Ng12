import { Injectable } from '@angular/core';
import { SmokeEventRecord } from 'src/app/network/model/garbage-event-record.model';
import { ImageControlModelArray } from 'src/app/view-model/image-control.model';
import { WindowBussiness } from './window/index-window.business';

@Injectable()
export class ElectricBikeIndexAlarmBusiness {
  constructor(private window: WindowBussiness) {}
  onpicture(images: ImageControlModelArray) {
    this.window.media.single.camera = images.models;
    this.window.media.single.index = images.index;
    this.window.media.single.autoplay = images.autoplay;
    this.window.media.single.show = true;
  }

  onplayback(images: ImageControlModelArray) {
    this.window.media.single.camera = images.models;
    this.window.media.single.index = images.index;
    this.window.media.single.autoplay = true;
    this.window.media.single.show = true;
  }

  onItemClicked(item: SmokeEventRecord) {
    this.window.record.show = true;
  }
}

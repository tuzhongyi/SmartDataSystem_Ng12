import { Injectable } from '@angular/core';
import { classToPlain, plainToClass } from 'class-transformer';
import { SmokeEventRecord } from 'src/app/network/model/garbage-event-record.model';
import {
  ImageControlModel,
  ImageControlModelArray,
} from 'src/app/view-model/image-control.model';
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

  onplayback(model: ImageControlModelArray) {
    if (model.models.length > 0) {
      let plain = classToPlain(model.models[0]);
      this.window.video.media = plainToClass(ImageControlModel<any>, plain);
      if (model.resourceId) {
        this.window.video.media.id = model.resourceId;
      }
      this.window.video.show = true;
    }
  }

  onItemClicked(item: SmokeEventRecord) {
    this.window.record.show = true;
  }
}

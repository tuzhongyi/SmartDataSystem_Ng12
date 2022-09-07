import { Injectable } from '@angular/core';
import { classToClass, classToPlain, plainToClass } from 'class-transformer';
import { VideoModel } from 'src/app/common/components/video-player/video.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { EventType } from 'src/app/enum/event-type.enum';
import {
  ImageControlModel,
  ImageControlModelArray,
} from 'src/app/view-model/image-control.model';
import { MediaWindowBusiness } from './media-window.business';
import { VideoSingleWindowBusiness } from './video-single-window.business';

@Injectable()
export class ElectricBikeIndexEventRecordWindowBusiness extends WindowViewModel {
  constructor(
    private media: MediaWindowBusiness,
    private video: VideoSingleWindowBusiness
  ) {
    super();
  }

  style = {
    height: '88%',
    width: '90%',
    transform: 'translate(-50%, -45%)',
  };
  type: EventType = EventType.Smoke;

  onimage(model: ImageControlModelArray) {
    this.media.single.camera = model.models;
    this.media.single.index = model.index;
    this.media.single.autoplay = model.autoplay;
    this.media.single.show = true;
  }
  onplay(model: ImageControlModelArray) {
    if (model.models.length > 0) {
      let plain = classToPlain(model.models[0]);
      this.video.media = plainToClass(ImageControlModel<any>, plain);
      if (model.resourceId) {
        this.video.media.id = model.resourceId;
      }
      this.video.show = true;
    }
  }
}

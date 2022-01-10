import { Component, Input, OnInit } from '@angular/core';
import { ImageVideoControlModel } from 'src/app/common/components/image-video-control/image-video-control.model';
import {
  PlayMode,
  VideoModel,
} from 'src/app/common/components/video-player/video.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { StreamType } from 'src/app/enum/stream-type.enum';
import { Camera } from 'src/app/network/model/camera.model';
import { MediaVideoControlBussiness } from './media-video-control.business';

@Component({
  selector: 'app-media-control',
  templateUrl: './media-control.component.html',
  styleUrls: ['./media-control.component.less'],
  providers: [MediaVideoControlBussiness],
})
export class MediaControlComponent
  implements OnInit, IComponent<Camera, ImageVideoControlModel>
{
  constructor(bussiness: MediaVideoControlBussiness) {
    this.business = bussiness;
  }
  business: IBusiness<Camera, ImageVideoControlModel>;

  title?: string;

  @Input()
  camera?: Camera;

  model?: ImageVideoControlModel;

  img?: string;

  ngOnInit() {
    if (this.camera) {
      this.title = this.camera.Name;
      let promise = this.business.load(
        this.camera,
        PlayMode.live,
        StreamType.sub
      );
      promise.then((x) => {
        this.model = x;
      });
    }
  }
}

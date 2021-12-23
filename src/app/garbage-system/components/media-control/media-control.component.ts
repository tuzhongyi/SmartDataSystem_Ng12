import { Component, Input, OnInit } from '@angular/core';
import {
  VideoMode,
  VideoModel,
} from 'src/app/common/components/video-player/video.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { StreamType } from 'src/app/enum/stream-type.enum';
import { Camera } from 'src/app/network/model/camera.model';
import { VideoUrl } from 'src/app/network/model/url.model';
import { MediaVideoControlBussiness } from './media-video-control.business';
import { MediaControlViewModel } from './media-control.model';
import { MediumRequestService } from 'src/app/network/request/medium/medium-request.service';

@Component({
  selector: 'app-media-control',
  templateUrl: './media-control.component.html',
  styleUrls: ['./media-control.component.less'],
  providers: [MediaVideoControlBussiness],
})
export class MediaControlComponent
  implements OnInit, IComponent<VideoUrl, VideoModel>
{
  constructor(bussiness: MediaVideoControlBussiness) {
    this.business = bussiness;
  }
  business: IBusiness<VideoUrl, VideoModel>;

  title?: string;

  @Input()
  camera?: Camera;

  model?: MediaControlViewModel;

  img?: string;

  ngOnInit() {
    if (this.camera) {
      this.title = this.camera.Name;
      let promise = this.business.load(
        this.camera,
        VideoMode.live,
        StreamType.sub
      );
      let img = MediumRequestService.jpg(this.camera.ImageUrl);
      promise.then((x) => {
        this.model = new MediaControlViewModel(img);
      });
    }
  }
}

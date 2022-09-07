import { Component, Input, OnInit } from '@angular/core';
import {
  PlayMode,
  VideoModel,
} from 'src/app/common/components/video-player/video.model';
import { WindowComponent } from 'src/app/common/components/window-control/window.component';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { IModel } from 'src/app/network/model/model.interface';
import { ImageControlModel } from 'src/app/view-model/image-control.model';
import { VideoWindowBusiness } from './video-window.business';

@Component({
  selector: 'howell-video-window',
  templateUrl: './video-window.component.html',
  styleUrls: ['./video-window.component.less'],
  providers: [VideoWindowBusiness],
})
export class VideoWindowComponent
  extends WindowComponent
  implements IComponent<IModel, VideoModel>, OnInit
{
  @Input()
  media?: ImageControlModel;

  @Input()
  business: IBusiness<IModel, VideoModel>;

  constructor(business: VideoWindowBusiness) {
    super();
    this.business = business;
  }

  model?: VideoModel;
  title: string = '';
  mode: PlayMode = PlayMode.vod;
  PlayMode = PlayMode;

  ngOnInit(): void {
    this.loadData(this.mode);
  }

  async loadData(mode: PlayMode) {
    if (this.media) {
      if (this.media) {
        this.title = this.media.name;
      }

      this.model = await this.business.load(this.media, mode);
    }
  }

  ondestroy(model: VideoModel) {}
  onstop() {
    this.Model.show = false;
  }
  onpreview() {
    this.mode = PlayMode.live;
    this.loadData(this.mode);
  }
}

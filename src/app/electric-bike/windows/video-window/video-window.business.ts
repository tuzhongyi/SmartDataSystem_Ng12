import { EventEmitter, Injectable } from '@angular/core';
import {
  PlayMode,
  VideoModel,
} from 'src/app/common/components/video-player/video.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { VideoControlConverter } from 'src/app/converter/video-control.converter';
import { StreamType } from 'src/app/enum/stream-type.enum';
import { VideoUrl } from 'src/app/network/model/url.model';
import { SRServerRequestService } from 'src/app/network/request/ai-sr-server/sr-server.service';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { ImageControlModel } from 'src/app/view-model/image-control.model';

@Injectable()
export class VideoWindowBusiness implements IBusiness<VideoUrl, VideoModel> {
  constructor(private service: SRServerRequestService) {}
  Converter: IConverter<VideoUrl, VideoModel> = new VideoControlConverter();
  subscription?: ISubscription | undefined;
  loading?: EventEmitter<void> | undefined;
  async load(img: ImageControlModel, mode: PlayMode): Promise<VideoModel> {
    let time = img.eventTime ?? new Date();
    let duration = DurationParams.beforeAndAfter(time, 15);
    let data = await this.getData(img.id, duration, mode);
    let model = this.Converter.Convert(data);
    return model;
  }
  getData(
    cameraId: string,
    duration: DurationParams,
    mode: PlayMode
  ): Promise<VideoUrl> {
    if (mode === PlayMode.vod) {
      return this.service.playback(cameraId, duration, StreamType.main);
    }
    return this.service.preview(cameraId, StreamType.main);
  }
}

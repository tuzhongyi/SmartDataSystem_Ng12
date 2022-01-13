import { Injectable } from '@angular/core';
import { classToPlain } from 'class-transformer';
import { StreamType } from 'src/app/enum/stream-type.enum';
import { VideoUrl } from '../../model/url.model';
import { SRServiceUrl } from '../../url/garbage/sr-server.url';
import { BaseRequestService } from '../base-request.service';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import { IntervalParams } from '../IParams.interface';
import { GetPreviewUrlParams, GetVodUrlParams } from './sr-request.params';

@Injectable({
  providedIn: 'root',
})
export class SRRequestService {
  constructor(_http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(_http);
  }
  private basic: BaseRequestService;

  preview(cameraId: string, stream?: StreamType): Promise<VideoUrl>;
  preview(params: GetPreviewUrlParams): Promise<VideoUrl>;

  preview(
    args: GetPreviewUrlParams | string,
    stream: StreamType = StreamType.sub
  ) {
    let data: any;
    if (typeof args === 'string') {
      let params = new GetPreviewUrlParams();
      params.CameraId = args;
      params.StreamType = stream;
      data = classToPlain(params);
    } else {
      data = classToPlain(args);
    }

    let url = SRServiceUrl.preview();
    return this.basic.post(url, VideoUrl, data);
  }

  playback(
    cameraId: string,
    interval: IntervalParams,
    stream?: StreamType
  ): Promise<VideoUrl>;
  playback(params: GetVodUrlParams): Promise<VideoUrl>;

  playback(
    args: GetVodUrlParams | string,
    interval?: IntervalParams,
    stream: StreamType = StreamType.main
  ) {
    let data: any;

    if (typeof args === 'string') {
      let params = new GetVodUrlParams();
      params.CameraId = args;
      params.BeginTime = interval!.BeginTime;
      params.EndTime = interval!.EndTime;
      params.StreamType = stream;
      data = classToPlain(params);
    } else {
      data = classToPlain(args);
    }

    let url = SRServiceUrl.vod();
    return this.basic.post(url, VideoUrl, data);
  }
}

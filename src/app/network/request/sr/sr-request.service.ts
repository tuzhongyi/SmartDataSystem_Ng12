import { Injectable } from '@angular/core';
import { classToPlain } from 'class-transformer';
import { StreamType } from 'src/app/enum/stream-type.enum';
import { VideoUrl } from '../../model/url.model';
import { SRServiceUrl } from '../../url/garbage/sr-server.url';
import { BaseRequestService } from '../base-request.service';
import { HowellAuthHttpService } from '../howell-auth-http.service';
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
    let url = SRServiceUrl.preview();
    let data: any;
    if (args instanceof GetPreviewUrlParams) {
      data = classToPlain(args);
    } else {
      let params = new GetPreviewUrlParams();
      params.CameraId = args;
      params.StreamType = stream;
      data = classToPlain(params);
    }

    return this.basic.post(url, VideoUrl, data);
  }

  playback(params: GetVodUrlParams) {
    let url = SRServiceUrl.vod();
    let data = classToPlain(params);
    return this.basic.post(url, VideoUrl, data);
  }
}

import { Injectable } from '@angular/core';
import { classToPlain } from 'class-transformer';
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

  preview(params: GetPreviewUrlParams) {
    let url = SRServiceUrl.preview();
    let data = classToPlain(params);
    return this.basic.post(url, VideoUrl, data);
  }

  playback(params: GetVodUrlParams) {
    let url = SRServiceUrl.vod();
    let data = classToPlain(params);
    return this.basic.post(url, VideoUrl, data);
  }
}

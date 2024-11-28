import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { instanceToPlain } from 'class-transformer';
import { StreamType } from 'src/app/enum/stream-type.enum';
import { Duration } from '../../model/garbage-station/duration.model';
import { SRServer } from '../../model/garbage-station/sr-server';
import { VideoUrl } from '../../model/url.model';
import { SRServersURL } from '../../url/aiop/sr-servers/sr-servers.url';
import { SRServiceUrl } from '../../url/garbage/sr-server.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../base-request-howell.service';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import { GetPreviewUrlParams, GetVodUrlParams } from './sr-server.params';

@Injectable({
  providedIn: 'root',
})
export class SRServerRequestService {
  private type: HowellBaseTypeRequestService<SRServer>;

  constructor(http: HowellAuthHttpService, router: Router) {
    this.basic = new HowellBaseRequestService(http, router);
    this.type = this.basic.type(SRServer);
  }
  private basic: HowellBaseRequestService;

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
      data = instanceToPlain(params);
    } else {
      data = instanceToPlain(args);
    }

    let url = SRServiceUrl.preview();
    return this.basic.post(url, VideoUrl, data).then((x: VideoUrl) => {
      if (!x.Url) {
        throw new Error('preview failed');
      }
      return x;
    });
  }

  playback(
    cameraId: string,
    interval: Duration,
    stream?: StreamType
  ): Promise<VideoUrl>;
  playback(params: GetVodUrlParams): Promise<VideoUrl>;

  playback(
    args: GetVodUrlParams | string,
    interval?: Duration,
    stream: StreamType = StreamType.main
  ) {
    let data: any;

    if (typeof args === 'string') {
      let params = new GetVodUrlParams();
      params.CameraId = args;
      if (interval) {
        params.BeginTime = interval.begin;
        params.EndTime = interval.end;
      }

      params.StreamType = stream;
      data = instanceToPlain(params);
    } else {
      data = instanceToPlain(args);
    }

    let url = SRServiceUrl.vod();
    return this.basic.post(url, VideoUrl, data).then((x: VideoUrl) => {
      if (!x.Url) {
        throw new Error('playback failed');
      }
      return x;
    });
  }

  list() {
    return this.type.getArray(SRServersURL.list());
  }
  create(item: SRServer) {
    return this.type.post(SRServersURL.basic, item);
  }
  get(id: string) {
    return this.type.get(SRServersURL.item(id));
  }
  update(item: SRServer) {
    return this.type.put(SRServersURL.item(item.Id), item);
  }
  delete(id: string) {
    return this.type.delete(SRServersURL.item(id));
  }
  sync(id: string) {
    return this.type.post(SRServersURL.sync(id));
  }
}

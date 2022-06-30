import { Injectable } from '@angular/core';
import { classToPlain } from 'class-transformer';
import { StreamType } from 'src/app/enum/stream-type.enum';
import { SRServer } from '../../model/sr-server';
import { VideoUrl } from '../../model/url.model';
import { SRServersURL } from '../../url/aiop/sr-servers/sr-servers.url';
import { SRServiceUrl } from '../../url/garbage/sr-server.url';
import { BaseRequestService, BaseTypeRequestService } from '../base-request.service';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import { DurationParams } from '../IParams.interface';
import { GetPreviewUrlParams, GetVodUrlParams } from './sr-server.params';

@Injectable({
  providedIn: 'root',
})
export class SRServerRequestService {
  private type: BaseTypeRequestService<SRServer>;

  constructor(_http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(_http);
    this.type = this.basic.type(SRServer);

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
    interval: DurationParams,
    stream?: StreamType
  ): Promise<VideoUrl>;
  playback(params: GetVodUrlParams): Promise<VideoUrl>;

  playback(
    args: GetVodUrlParams | string,
    interval?: DurationParams,
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



  create(item: SRServer) {
    return this.type.post(SRServersURL.basic, item);
  }
  get(id: string) {
    return this.type.get(SRServersURL.item(id));
  }
  set(item: SRServer) {
    return this.type.post(SRServersURL.item(item.Id), item)
  }

  list() {
    return this.type.get(SRServersURL.list());
  }

  sync(id: string) {
    return this.type.post(SRServersURL.sync(id))
  }
  delete(id: string) {
    return this.type.delete(SRServersURL.item(id))
  }
}

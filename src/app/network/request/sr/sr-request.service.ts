import { Injectable } from '@angular/core';
import { classToPlain } from 'class-transformer';
import { StreamType } from 'src/app/enum/stream-type.enum';
import { SRServer } from '../../model/sr-server';
import { VideoUrl } from '../../model/url.model';
import { SRServersURL } from '../../url/aiop/SRServers/sr-servers.url';
import { SRServiceUrl } from '../../url/garbage/sr-server.url';
import { BaseRequestService, BaseTypeRequestService } from '../base-request.service';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import { DurationParams } from '../IParams.interface';
import { GetPreviewUrlParams, GetVodUrlParams } from './sr-request.params';

@Injectable({
  providedIn: 'root',
})
export class SRRequestService {
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



  // create(item: SRServer) {
  //   return this.requestService.post<SRServer, HowellResponse<SRServer>>(
  //     AIOPSRServiceUrl.create(),
  //     SaveModel.toModel(item, SaveModel.formMustField.srServer)
  //   );
  // }

  // get(id: string) {
  //   return this.requestService.get<SRServer>(AIOPSRServiceUrl.get(id));
  // }

  // set(item: SRServer) {
  //   return this.requestService.put<SRServer, HowellResponse<SRServer>>(
  //     AIOPSRServiceUrl.edit(item.Id),
  //     item
  //   );
  // }

  // del(id: string) {
  //   return this.requestService.delete<SRServer>(AIOPSRServiceUrl.del(id));
  // }

  list() {
    return this.type.get(SRServersURL.list());
  }

  // sync(id: string) {
  //   return this.requestService.post<any>(AIOPSRServiceUrl.sync(id));
  // }
}

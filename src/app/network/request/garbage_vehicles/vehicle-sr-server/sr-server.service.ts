/*
 * @Author: pmx 
 * @Date: 2022-11-06 15:17:31 
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-06 15:35:53
 */
import { Injectable } from '@angular/core';
import { classToPlain } from 'class-transformer';
import { StreamType } from 'src/app/enum/stream-type.enum';
import { SRServer } from '../../model/sr-server';
import { VideoUrl } from '../../model/url.model';
import { SRServersURL } from '../../url/aiop/sr-servers/sr-servers.url';
import { GarbageVehicleSRServerUrl } from '../../url/garbage-vehicle/sr-server.url';
import { SRServiceUrl } from '../../url/garbage/sr-server.url';
import { BaseRequestService, BaseTypeRequestService } from '../base-request.service';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import { DurationParams } from '../IParams.interface';
import { GetVehiclePreviewUrlParams, GetVehicleVodUrlParams } from './sr-server.params';

@Injectable({
  providedIn: 'root',
})
export class VehicleSRServerRequestService {
  private type: BaseTypeRequestService<SRServer>;

  constructor(_http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(_http);
    this.type = this.basic.type(SRServer);

  }
  private basic: BaseRequestService;

  preview(
    args: GetVehiclePreviewUrlParams | string,
    stream: StreamType = StreamType.sub
  ) {
    let data: any;
    if (typeof args === 'string') {
      let params = new GetVehiclePreviewUrlParams();
      params.CameraId = args;
      params.StreamType = stream;
      data = classToPlain(params);
    } else {
      data = classToPlain(args);
    }

    let url = GarbageVehicleSRServerUrl.preview();
    return this.basic.post(url, VideoUrl, data);
  }



  void(
    args: GetVehicleVodUrlParams | string,
    interval?: DurationParams,
    stream: StreamType = StreamType.main
  ) {
    let data: any;

    if (typeof args === 'string') {
      let params = new GetVehicleVodUrlParams();
      params.CameraId = args;
      params.BeginTime = interval!.BeginTime;
      params.EndTime = interval!.EndTime;
      params.StreamType = stream;
      data = classToPlain(params);
    } else {
      data = classToPlain(args);
    }

    let url = GarbageVehicleSRServerUrl.vod();
    return this.basic.post(url, VideoUrl, data);
  }

}

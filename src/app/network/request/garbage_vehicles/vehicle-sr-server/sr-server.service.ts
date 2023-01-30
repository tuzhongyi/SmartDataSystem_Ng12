/*
 * @Author: pmx
 * @Date: 2022-11-06 15:17:31
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-06 15:35:53
 */
import { Injectable } from '@angular/core';
import { instanceToPlain } from 'class-transformer';
import { StreamType } from 'src/app/enum/stream-type.enum';
import { SRServer } from 'src/app/network/model/sr-server';
import { VideoUrl } from 'src/app/network/model/url.model';
import { GarbageVehicleSRServerUrl } from 'src/app/network/url/garbage-vehicle/sr-server.url';
import {
  BaseTypeRequestService,
  BaseRequestService,
} from '../../base-request.service';
import { HowellAuthHttpService } from '../../howell-auth-http.service';
import { DurationParams } from '../../IParams.interface';
import {
  GetVehiclePreviewUrlParams,
  GetVehicleVodUrlParams,
} from './sr-server.params';

@Injectable({
  providedIn: 'root',
})
export class VehicleSRServerRequestService {
  constructor(_http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(_http);
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
      data = instanceToPlain(params);
    } else {
      data = instanceToPlain(args);
    }

    let url = GarbageVehicleSRServerUrl.preview();
    return this.basic.post<VideoUrl>(url, VideoUrl, data);
  }

  playback(
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
      data = instanceToPlain(params);
    } else {
      data = instanceToPlain(args);
    }

    let url = GarbageVehicleSRServerUrl.vod();
    return this.basic.post<VideoUrl>(url, VideoUrl, data);
  }
}

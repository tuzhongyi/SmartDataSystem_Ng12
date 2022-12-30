import { EventEmitter, Injectable } from '@angular/core';
import { VideoModel } from 'src/app/common/components/video-player/video.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { VideoControlConverter } from 'src/app/converter/video-control.converter';
import { StreamType } from 'src/app/enum/stream-type.enum';
import { VideoUrl } from 'src/app/network/model/url.model';
import { GetVehicleVodUrlParams } from 'src/app/network/request/garbage_vehicles/vehicle-sr-server/sr-server.params';
import { VehicleSRServerRequestService } from 'src/app/network/request/garbage_vehicles/vehicle-sr-server/sr-server.service';
import { DurationParams } from 'src/app/network/request/IParams.interface';

@Injectable()
export class CollectionMapRouteVideoBusiness
  implements IBusiness<VideoUrl, VideoModel>
{
  constructor(private service: VehicleSRServerRequestService) {}
  Converter = new VideoControlConverter();
  subscription?: ISubscription | undefined;
  loading?: EventEmitter<void> | undefined;
  async load(
    cameraId: string,
    begin: Date,
    end: Date,
    stream: StreamType = StreamType.main
  ): Promise<VideoModel> {
    let duration = new DurationParams();
    duration.BeginTime = begin;
    duration.EndTime = end;
    let data = await this.getData(cameraId, duration, stream);
    let model = this.Converter.Convert(data);
    return model;
  }
  getData(
    cameraId: string,
    duration: DurationParams,
    stream: StreamType = StreamType.main
  ): Promise<VideoUrl> {
    let params = new GetVehicleVodUrlParams();
    params.CameraId = cameraId;
    params.StreamType = stream;
    params.BeginTime = duration.BeginTime;
    params.EndTime = duration.EndTime;
    return this.service.playback(params);
  }
}

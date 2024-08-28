import { instanceToPlain } from 'class-transformer';
import { CameraAbnormalStatistic } from 'src/app/network/model/garbage-station/abnormal/camera-abnormal-statistic.model';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';
import { GarbageStationUrl } from 'src/app/network/url/garbage/garbage-station.url';
import { HowellBaseRequestService } from '../../base-request-howell.service';
import {
  GetCameraAbnormalsListParams,
  GetCameraAbnormalsStatisticParams,
} from './garbage-station-camera-request.params';

export class GarbageStationCameraAbnormalRequestService {
  constructor(private basic: HowellBaseRequestService) {}

  statistic(params: GetCameraAbnormalsStatisticParams) {
    let url = GarbageStationUrl.camera().abnormal().statistic();
    let plain = instanceToPlain(params);
    return this.basic.post(url, CameraAbnormalStatistic, plain);
  }
  list(params: GetCameraAbnormalsListParams) {
    let url = GarbageStationUrl.camera().abnormal().list();
    return this.basic.paged(url, Camera, params);
  }
}

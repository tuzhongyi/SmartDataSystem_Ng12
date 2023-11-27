import { instanceToPlain } from 'class-transformer';
import { CameraDailyAICount } from 'src/app/network/model/garbage-station/camera-daily-ai-count.model';
import { ResourcesUrl } from 'src/app/network/url/aiop/resources/resources.url';
import { HowellBaseRequestService } from '../../../base-request-howell.service';
import { GetResourceCameraDailyAICountParams } from './resource-camera-ai-count.param';

export class ResourceCameraAICountService {
  constructor(private basic: HowellBaseRequestService) {}

  list(
    params: GetResourceCameraDailyAICountParams = new GetResourceCameraDailyAICountParams()
  ) {
    let plain = instanceToPlain(params);
    let url = ResourcesUrl.camera().aiCount().list();
    return this.basic.paged(url, CameraDailyAICount, plain);
  }
}

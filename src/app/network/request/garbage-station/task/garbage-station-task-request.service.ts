import { GarbageTask } from 'src/app/network/model/garbage-station/garbage-task.model';
import { GarbageStationUrl } from 'src/app/network/url/garbage/garbage-station.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../base-request-howell.service';
import { FinishTaskParams } from '../garbage-station-request.params';

export class GarbageStationTaskRequestService {
  constructor(private basic: HowellBaseRequestService) {
    this.basicType = basic.type(GarbageTask);
  }
  private basicType: HowellBaseTypeRequestService<GarbageTask>;
  finish(
    stationId: string,
    taskId: string,
    params: FinishTaskParams
  ): Promise<GarbageTask> {
    let url = GarbageStationUrl.task(stationId).finish(taskId);
    return this.basicType.post(url, params);
  }
}

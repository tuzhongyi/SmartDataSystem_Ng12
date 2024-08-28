import { instanceToPlain } from 'class-transformer';
import { NBStatus } from 'src/app/network/model/garbage-station/nb-box/nb-status.model';
import { GarbageStationUrl } from 'src/app/network/url/garbage/garbage-station.url';
import { HowellBaseRequestService } from '../../base-request-howell.service';
import { GarbageStationNBRebootParams } from './garbage-station-nb-box.request.params';
import { NBHeartbeatRecord } from './nb-heartbeat-record.model';

export class GarbageStationNBBoxRequestService {
  constructor(private basic: HowellBaseRequestService) {}

  reboot(id: string, params: GarbageStationNBRebootParams) {
    let url = GarbageStationUrl.nb.box(id).reboot();
    let plain = instanceToPlain(params);
    return this.basic.postReturnString(url, plain);
  }
  status(id: string) {
    let url = GarbageStationUrl.nb.box(id).status();
    return this.basic.get(url, NBStatus);
  }
  history(id: string) {
    let url = GarbageStationUrl.nb.box(id).history();
    return this.basic.getArray(url, NBHeartbeatRecord);
  }
}

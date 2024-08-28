import { Injectable } from '@angular/core';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { GarbageStationNBRebootParams } from 'src/app/network/request/garbage-station/nb-box/garbage-station-nb-box.request.params';

@Injectable()
export class AuditListStationGarbageManagerCommandNBBoxBusiness {
  constructor(private service: GarbageStationRequestService) {}

  reboot(stationId: string, type: number) {
    let params = new GarbageStationNBRebootParams();
    params.RebootType = type;
    return this.service.nb.box.reboot(stationId, params);
  }
}

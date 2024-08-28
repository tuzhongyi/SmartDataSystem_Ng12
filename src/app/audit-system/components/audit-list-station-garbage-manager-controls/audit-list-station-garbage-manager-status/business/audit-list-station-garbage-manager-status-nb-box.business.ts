import { Injectable } from '@angular/core';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class AuditListStationGarbageManagerStatusNBBoxBusiness {
  constructor(private service: GarbageStationRequestService) {}

  load(stationId: string) {
    return this.service.nb.box.status(stationId);
  }
}

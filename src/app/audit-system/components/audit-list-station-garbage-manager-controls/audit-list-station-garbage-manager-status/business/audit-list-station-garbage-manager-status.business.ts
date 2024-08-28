import { Injectable } from '@angular/core';
import { AIGarbageRequestService } from 'src/app/network/request/ai-garbage/ai-garbage.service';
import { AuditListStationGarbageManagerStatusNBBoxBusiness } from './audit-list-station-garbage-manager-status-nb-box.business';

@Injectable()
export class AuditListStationGarbageManagerStatusBusiness {
  constructor(
    private service: AIGarbageRequestService,
    public nb: AuditListStationGarbageManagerStatusNBBoxBusiness
  ) {}

  device(deviceId: string) {
    return this.service.device.get(deviceId);
  }
}

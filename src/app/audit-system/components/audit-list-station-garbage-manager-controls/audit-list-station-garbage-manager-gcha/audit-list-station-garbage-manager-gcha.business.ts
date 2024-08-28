import { Injectable } from '@angular/core';
import { AIGarbageRequestService } from 'src/app/network/request/ai-garbage/ai-garbage.service';

@Injectable()
export class AuditListStationGarbageManagerGCHABusiness {
  constructor(private service: AIGarbageRequestService) {}

  load(id: string) {
    return this.service.device.get(id);
  }
}

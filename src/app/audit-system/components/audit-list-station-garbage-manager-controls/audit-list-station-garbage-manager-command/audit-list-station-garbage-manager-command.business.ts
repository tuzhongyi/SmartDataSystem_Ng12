import { Injectable } from '@angular/core';
import { AIGarbageRequestService } from 'src/app/network/request/ai-garbage/ai-garbage.service';

@Injectable()
export class AuditListStationGarbageManagerCommandBusiness {
  constructor(private service: AIGarbageRequestService) {}

  get(id: string) {
    return this.service.device.get(id);
  }
}

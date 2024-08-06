import { Injectable } from '@angular/core';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';

@Injectable()
export class MonitorBusiness {
  constructor(private service: DivisionRequestService) {}
  get(divisionId: string) {
    return this.service.cache.get(divisionId);
  }
}

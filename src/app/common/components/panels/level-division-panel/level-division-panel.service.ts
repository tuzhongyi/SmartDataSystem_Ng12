import { Injectable } from '@angular/core';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';

@Injectable()
export class LevelDivisionPanelService {
  constructor(private service: DivisionRequestService) {}

  children(divisionId: string) {
    let params = new GetDivisionsParams();
    params.ParentId = divisionId;
    return this.service.all(params);
  }

  get(divisionId: string) {
    return this.service.cache.get(divisionId);
  }
}

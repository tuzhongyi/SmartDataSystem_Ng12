import { Injectable } from '@angular/core';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';

@Injectable()
export class InfoDetailsDivisionCommitteesStatisticBusiness {
  constructor(private service: DivisionRequestService) {}
  load(divisionId: string) {
    return this.service.statistic.number.get(divisionId);
  }
}

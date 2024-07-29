import { Injectable } from '@angular/core';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { InfoDetailsDivisionCommitteesMemberBusiness } from './info-details-division-committees-member.business';
import { InfoDetailsDivisionCommitteesStatisticBusiness } from './info-details-division-committees-statistic.business';

@Injectable()
export class InfoDetailsDivisionCommitteesBusiness {
  constructor(
    public statistic: InfoDetailsDivisionCommitteesStatisticBusiness,
    public member: InfoDetailsDivisionCommitteesMemberBusiness,
    private service: DivisionRequestService
  ) {}

  get(divisionId: string) {
    return this.service.get(divisionId);
  }
}

import { Injectable } from '@angular/core';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { InfoDetailsDivisionCountyMemberBusiness } from './info-details-division-county-member.business';
import { InfoDetailsDivisionCountyStatisticBusiness } from './info-details-division-county-statistic.business';

@Injectable()
export class InfoDetailsDivisionCountyBusiness {
  constructor(
    public statistic: InfoDetailsDivisionCountyStatisticBusiness,
    public member: InfoDetailsDivisionCountyMemberBusiness,
    private service: DivisionRequestService
  ) {}

  get(divisionId: string) {
    return this.service.get(divisionId);
  }
}

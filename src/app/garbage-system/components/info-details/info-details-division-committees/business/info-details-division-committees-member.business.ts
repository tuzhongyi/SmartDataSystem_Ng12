import { Injectable } from '@angular/core';
import { GetMembersParams } from 'src/app/network/request/member/member-request.params';
import { MemberRequsetService } from 'src/app/network/request/member/member-request.service';

@Injectable()
export class InfoDetailsDivisionCommitteesMemberBusiness {
  constructor(private service: MemberRequsetService) {}
  async load(divisionId: string) {
    let params = new GetMembersParams();
    params.DivisionId = divisionId;
    let paged = await this.service.list(params);
    return paged.Data.filter((x) => x.DivisionId === divisionId);
  }
}

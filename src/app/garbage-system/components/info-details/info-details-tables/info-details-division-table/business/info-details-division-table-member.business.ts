import { Injectable } from '@angular/core';
import { GetMembersParams } from 'src/app/network/request/member/member-request.params';
import { MemberRequsetService } from 'src/app/network/request/member/member-request.service';
import { InfoDetailsDivisionTableArgs } from '../info-details-division-table.model';

@Injectable()
export class InfoDetailsDivisionTableMemberBusiness {
  constructor(private service: MemberRequsetService) {}
  async load(args: InfoDetailsDivisionTableArgs) {
    let params = new GetMembersParams();
    params.DivisionId = args.divisionId;
    let paged = await this.service.list(params);
    return paged.Data;
  }
}

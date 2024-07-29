import { Injectable } from '@angular/core';
import { GetMembersParams } from 'src/app/network/request/member/member-request.params';
import { MemberRequsetService } from 'src/app/network/request/member/member-request.service';
import { InfoDetailsStationTableArgs } from '../info-details-station-table.model';

@Injectable()
export class InfoDetailsStationTableMemberBusiness {
  constructor(private service: MemberRequsetService) {}
  async load(args: InfoDetailsStationTableArgs) {
    let params = new GetMembersParams();
    params.DivisionId = args.divisionId;
    let paged = await this.service.list(params);
    return paged.Data;
  }
}

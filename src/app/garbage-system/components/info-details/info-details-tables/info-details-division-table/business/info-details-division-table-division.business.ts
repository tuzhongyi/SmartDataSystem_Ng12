import { Injectable } from '@angular/core';
import {
  GetDivisionStatisticNumbersParams,
  GetDivisionsParams,
} from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { InfoDetailsDivisionTableArgs } from '../info-details-division-table.model';

@Injectable()
export class InfoDetailsDivisionTableDivisionBusiness {
  constructor(private service: DivisionRequestService) {}

  async list(args: InfoDetailsDivisionTableArgs) {
    let params = new GetDivisionsParams();
    params.ParentId = args.divisionId;
    let paged = await this.service.cache.list(params);
    return paged.Data;
  }

  get(divisionId: string) {
    return this.service.cache.get(divisionId);
  }

  async load(args: InfoDetailsDivisionTableArgs) {
    let list = await this.list(args);
    let params = new GetDivisionStatisticNumbersParams();
    params.Ids = list.map((x) => x.Id);
    let paged = await this.service.statistic.number.list(params);
    return paged.Data;
  }
}

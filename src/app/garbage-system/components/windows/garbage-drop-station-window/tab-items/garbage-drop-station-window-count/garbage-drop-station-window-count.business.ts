import { Injectable } from '@angular/core';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';

@Injectable()
export class GarbageDropStationWindowCountBusiness {
  constructor(private _divisionRequest: DivisionRequestService) {}
  async getCounties(type: DivisionType) {
    let params = new GetDivisionsParams();
    params.DivisionType = type;
    let paged = await this._divisionRequest.cache.list(params);
    return paged.Data;
  }

  async getCommittees(divisionId: string) {
    let params = new GetDivisionsParams();
    params.ParentId = divisionId;
    let paged = await this._divisionRequest.cache.list(params);
    return paged.Data;
  }
}

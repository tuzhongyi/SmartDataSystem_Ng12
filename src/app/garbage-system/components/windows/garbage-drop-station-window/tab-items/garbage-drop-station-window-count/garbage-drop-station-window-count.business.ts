import { Injectable } from '@angular/core';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';

@Injectable()
export class GarbageDropStationWindowCountBusiness {
  constructor(private _divisionRequest: DivisionRequestService) {}
  async getDivisionsByType(type: DivisionType) {
    let params = new GetDivisionsParams();
    params.DivisionType = type;
    let paged = await this._divisionRequest.cache.list(params);
    return paged.Data;
  }

  async getDivisionsByParentId(parentId: string) {
    let params = new GetDivisionsParams();
    params.ParentId = parentId;
    let paged = await this._divisionRequest.cache.list(params);
    return paged.Data;
  }
}

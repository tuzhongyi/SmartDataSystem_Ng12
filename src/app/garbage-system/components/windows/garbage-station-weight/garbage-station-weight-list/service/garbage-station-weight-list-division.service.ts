import { Injectable } from '@angular/core';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';

@Injectable()
export class GarbageStationWeightListDivisionService {
  constructor(private service: DivisionRequestService) {}

  async byType(type?: DivisionType) {
    let params = new GetDivisionsParams();
    params.DivisionType = type;
    let paged = await this.service.cache.list(params);
    return paged.Data;
  }

  async byParentId(parentId?: string) {
    let params = new GetDivisionsParams();
    params.ParentId = parentId;
    let paged = await this.service.cache.list(params);
    return paged.Data;
  }
}

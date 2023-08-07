import { Injectable } from '@angular/core';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';

@Injectable()
export class GarbageStationWeightListBusiness {
  constructor(private service: DivisionRequestService) {}

  async list(type: UserResourceType) {
    let child = EnumHelper.GetResourceChildType(type);

    let params = new GetDivisionsParams();
    params.DivisionType = EnumHelper.ConvertUserResourceToDivision(child);
    let paged = await this.service.list(params);
    return paged.Data;
  }
}

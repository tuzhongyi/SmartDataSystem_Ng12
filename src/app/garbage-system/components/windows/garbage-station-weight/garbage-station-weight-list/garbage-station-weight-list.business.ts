import { Injectable } from '@angular/core';
import { EnumTool } from 'src/app/common/tools/enum-tool/enum.tool';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';

@Injectable()
export class GarbageStationWeightListBusiness {
  constructor(private service: DivisionRequestService) {}

  async list(type: UserResourceType) {
    let child = EnumTool.resource.child(type);

    let params = new GetDivisionsParams();
    params.DivisionType = EnumTool.resource.to.division(child);
    let paged = await this.service.cache.list(params);
    return paged.Data;
  }
}

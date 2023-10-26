import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';

@Injectable()
export class DapuqiaoGarbageDropStationWindowCountBusiness
  implements IBusiness<Division[]>
{
  constructor(private service: DivisionRequestService) {}
  load(type: UserResourceType): Promise<Division[]> {
    let divisionType = this.getType(type);
    return this.getData(divisionType);
  }

  getType(type: UserResourceType) {
    switch (type) {
      case UserResourceType.County:
        return DivisionType.City;
      case UserResourceType.Committees:
        return DivisionType.County;
      case UserResourceType.Station:
        return DivisionType.Committees;
      case UserResourceType.City:
        return DivisionType.Province;
      default:
        return DivisionType.None;
    }
  }

  async getData(type: DivisionType): Promise<Division[]> {
    let params = new GetDivisionsParams();
    params.DivisionType = type;
    let paged = await this.service.cache.list(params);
    return paged.Data;
  }
}

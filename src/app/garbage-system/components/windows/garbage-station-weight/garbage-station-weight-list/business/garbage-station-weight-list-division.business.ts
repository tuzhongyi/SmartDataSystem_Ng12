import { Injectable } from '@angular/core';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { GarbageStationWeightListDivisionService } from '../service/garbage-station-weight-list-division.service';

@Injectable()
export class GarbageStationWeightListDivisionBusiness {
  constructor(private service: GarbageStationWeightListDivisionService) {}

  list(parentId: string): Promise<Division[]>;
  list(type: UserResourceType): Promise<Division[]>;
  list(args: string | UserResourceType): Promise<Division[]> {
    if (typeof args === 'string') {
      return this.service.byParentId(args);
    } else {
      let type = DivisionType.None;
      switch (args) {
        case UserResourceType.County:
          type = DivisionType.County;
          break;
        case UserResourceType.Committees:
          type = DivisionType.Committees;
          break;

        default:
          break;
      }

      return this.service.byType(type);
    }
  }
}

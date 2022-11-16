import { Injectable } from '@angular/core';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { Division } from 'src/app/network/model/division.model';
import {
  DivisionManageModel,
  IDivisionManageBusiness,
} from 'src/app/aiop-system/components/division-manage/division-manange.model';
import { GarbageVehicleDivisionRequestService } from 'src/app/network/request/garbage_vehicles/divisions/division-request.service';

@Injectable()
export class GarbageVehicleDivisionManageBusiness
  implements IDivisionManageBusiness
{
  constructor(private service: GarbageVehicleDivisionRequestService) {}

  async create(
    parentId: string,
    model: DivisionManageModel
  ): Promise<Division> {
    let division = new Division();
    division.Id = model.Id;
    division.Name = model.Name;
    division.Description = model.Description;

    division.IsLeaf = false;
    division.CreateTime = new Date();
    division.UpdateTime = new Date();

    if (parentId) {
      let parent = await this.service.get(parentId);
      division.DivisionType = EnumHelper.GetDivisionChildType(
        parent.DivisionType
      );
      division.ParentId = parent.Id;
    } else {
      division.DivisionType = DivisionType.City;
      division.ParentId = undefined;
    }

    let res = await this.service.create(division);
    return res;
  }

  async delete(id: string) {
    let res = await this.service.delete(id);
    return res;
  }
  async update(id: string, model: DivisionManageModel) {
    let division = await this.service.get(id);
    division.Name = model.Name;
    division.Description = model.Description;
    let res = await this.service.update(division);
    return res;
  }
}

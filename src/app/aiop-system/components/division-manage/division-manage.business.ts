import { Injectable } from '@angular/core';
import {
  DivisionManageModel,
  IDivisionManageBusiness,
} from 'src/app/aiop-system/components/division-manage/division-manange.model';
import { EnumTool } from 'src/app/common/tools/enum-tool/enum.tool';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';

@Injectable()
export class DivisionManageBusiness implements IDivisionManageBusiness {
  constructor(private service: DivisionRequestService) {}

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
      let parent = await this.service.cache.get(parentId);
      division.DivisionType = EnumTool.division.child(parent.DivisionType);
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
    let division = await this.service.cache.get(id);
    division.Name = model.Name;
    division.Description = model.Description;
    let res = await this.service.update(division);
    return res;
  }
}

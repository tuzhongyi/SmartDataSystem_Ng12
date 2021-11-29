import { Injectable } from '@angular/core';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { Division } from 'src/app/network/model/division.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { DivisionManageModel } from 'src/app/view-model/division-manange.model';

@Injectable()
export class DivisionManageBusiness {
  constructor(private _divisionRequest: DivisionRequestService) {}

  async addDivision(id: string, model: DivisionManageModel) {
    let division = new Division();
    division.Id = model.id;
    division.Name = model.name;
    division.Description = model.description;

    division.IsLeaf = false;
    division.CreateTime = new Date();
    division.UpdateTime = new Date();

    if (id) {
      let parent = await this._divisionRequest.get(id);
      division.DivisionType = EnumHelper.GetDivisionChildType(
        parent.DivisionType
      );
      division.ParentId = parent.Id;
    } else {
      division.DivisionType = DivisionType.City;
      division.ParentId = null;
    }

    let res = await this._divisionRequest.create(division);
    return res;
  }
  async deleteDivision(id: string) {
    let res = await this._divisionRequest.delete(id);
    return res;
  }
  async editDivision(id: string, model: DivisionManageModel) {
    if (id) {
      let division = await this._divisionRequest.get(id);
      division.Name = model.name;
      division.Description = model.description;

      let res = await this._divisionRequest.update(division);
      return res;
    }
    return false;
  }
}

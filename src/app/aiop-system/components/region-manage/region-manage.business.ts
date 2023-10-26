import { Injectable } from '@angular/core';
import { Region } from 'src/app/network/model/garbage-station/region';
import { RegionRequestService } from 'src/app/network/request/region/region.service';
import { RegionManageModel } from 'src/app/view-model/region-manage.model';

@Injectable()
export class RegionManageBusiness {
  constructor(private _regionRequest: RegionRequestService) {}

  async addRegion(parentId: string, model: RegionManageModel) {
    let region = new Region();
    region.Id = '';
    region.ParentId = parentId;
    region.Name = model.Name;
    region.Description = model.Description;
    region.IsLeaf = false;
    region.RegionType = 2;
    region.CreateTime = new Date();
    region.UpdateTime = new Date();

    let res = await this._regionRequest.create(region);
    return res;
  }
  async editRegion(id: string, model: RegionManageModel) {
    let region = await this._regionRequest.get(id);
    region.Name = model.Name;
    region.Description = model.Description;
    region.UpdateTime = new Date();

    let res = await this._regionRequest.update(region);
    return res;
  }
  async deleteRegion(id: string) {
    let res = await this._regionRequest.delete(id);
    return res;
  }
}

import { Injectable } from '@angular/core';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import {
  GetDivisionsParams,
  GetDivisionTreeParams,
} from 'src/app/network/request/division/division-request.params';
import { CollectionDivisionRequestService } from 'src/app/network/request/garbage_vehicles/divisions/collection-division-request.service';
@Injectable()
export class GarbageVehicleCameraTreeDivisionBusiness {
  constructor(private service: CollectionDivisionRequestService) {}

  get(id: string) {
    return this.service.get(id);
  }

  async all() {
    let paged = await this.service.list();
    return paged.Data;
  }

  async getByType(type: DivisionType, parentId?: string): Promise<Division[]> {
    let params = new GetDivisionsParams();
    params.DivisionType = type;
    params.ParentId = parentId;
    let paged = await this.service.list(params);
    return paged.Data;
  }

  async getByParentId(parentId: string) {
    let params = new GetDivisionsParams();
    params.ParentId = parentId;
    let paged = await this.service.list(params);
    return paged.Data;
  }

  async getByName(name?: string) {
    let params = new GetDivisionsParams();
    params.Name = name;
    let paged = await this.service.list(params);
    return paged.Data;
  }

  async tree(condition: string) {
    let params = new GetDivisionTreeParams();
    params.Name = condition;
    let res = await this.service.tree(params);
    return res.Nodes;
  }
}

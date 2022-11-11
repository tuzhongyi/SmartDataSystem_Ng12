import { Injectable } from '@angular/core';
import { IService } from 'src/app/business/Ibusiness';
import { ICollectionDivisionListBusiness } from 'src/app/common/interfaces/collection-division-list.interface';
import { Division } from 'src/app/network/model/division.model';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { GarbageVehicleDivisionRequestService } from 'src/app/network/request/garbage_vehicles/divisions/division-request.service';

@Injectable()
export class GarbageVehiclesDivisionListBusiness {
  constructor(
    private _garbageVehicleDivisionRequest: GarbageVehicleDivisionRequestService
  ) {}

  // async get(id: string) {
  //   let data = await this._garbageVehicleDivisionRequest.get(id);
  //   return data;
  // }
  // /**获得直接子元素 */
  // async listChildDivisions(id: string) {
  //   let params = new GetDivisionsParams();
  //   params.ParentId = id;
  //   let res = await this._garbageVehicleDivisionRequest.cache.list(params);

  //   return res.Data.sort((a, b) => {
  //     return a.Name.localeCompare(b.Name);
  //   });
  // }
  getDivision(id: string) {
    return this._garbageVehicleDivisionRequest.get(id);
  }
}

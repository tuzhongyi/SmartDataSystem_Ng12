import { Injectable } from '@angular/core';

import { CollectionVehicleConverter } from './collection-device-state.converter';
import { GarbageVehicleRequestService } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.service';
import { GetGarbageVehiclesParams } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.params';
import { ICollectionDeviceStateSearchInfo } from './collection-device-state.model';

@Injectable()
export class CollectionDeviceStateBusiness {
  constructor(
    private _garbageVehicleRequest: GarbageVehicleRequestService,
    private _converter: CollectionVehicleConverter
  ) { }

  async init(searchInfo: ICollectionDeviceStateSearchInfo) {
    let { Data } = await this._listGarbageVehicle(searchInfo);
    console.log(Data)
    let res = this._converter.Convert(Data);

    return res;
  }
  private _listGarbageVehicle(searchInfo: ICollectionDeviceStateSearchInfo) {
    let params = new GetGarbageVehiclesParams();
    if (searchInfo.PageIndex) params.PageIndex = searchInfo.PageIndex;
    if (searchInfo.PageSize) params.PageSize = searchInfo.PageSize;
    if (searchInfo.DivisionId) params.DivisionId = searchInfo.DivisionId;

    return this._garbageVehicleRequest.list(params);
  }
}

import { Injectable } from '@angular/core';

import { CollectionVehicleConverter } from './collection-device-state.converter';
import { GarbageVehicleRequestService } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.service';
import { GetGarbageVehiclesParams } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.params';

@Injectable()
export class CollectionDeviceStateBusiness {
  constructor(
    private _garbageVehicleRequest: GarbageVehicleRequestService,
    private _converter: CollectionVehicleConverter
  ) {}

  async init() {
    let { Data } = await this._listGarbageVehicle();
    let res = this._converter.Convert(Data);

    return res;
  }
  private _listGarbageVehicle() {
    let params = new GetGarbageVehiclesParams();
    return this._garbageVehicleRequest.list(params);
  }
}

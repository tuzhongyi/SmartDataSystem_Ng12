import { Injectable } from '@angular/core';

import { GarbageVehicleRequestService } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.service';
import { GetGarbageCollectionEventRecordsParams } from 'src/app/network/request/garbage_vehicles/vehicle-event/vehicle-event.params';
import { CollectionVehicleConverter } from './collection-vehicle.converter';
import { CollectionVehicleSearchInfo } from './collection-vehicle.model';

@Injectable()
export class CollectionVehicleBusiness {
  constructor(
    private _garbageVehicleRequest: GarbageVehicleRequestService,
    private _converter: CollectionVehicleConverter
  ) {}
  async init(searchInfo: CollectionVehicleSearchInfo) {
    let { Data } = await this._list(searchInfo);

    let res = this._converter.iterateToModel(Data);

    return res;
  }
  private _list(searchInfo: CollectionVehicleSearchInfo) {
    let params = new GetGarbageCollectionEventRecordsParams();

    params.DivisionIds = searchInfo.DivisionIds;

    return this._garbageVehicleRequest.list(params);
  }
}

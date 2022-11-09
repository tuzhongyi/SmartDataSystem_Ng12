import { Injectable } from '@angular/core';
import { GetGarbageCollectionEventRecordsParams } from 'src/app/network/request/garbage_vehicles/vehicle-event/vehicle-event.params';
import { VehicleEventRequestService } from 'src/app/network/request/garbage_vehicles/vehicle-event/vehicle-event.service';
import { CollectionVehicleConverter } from './collection-vehicle.converter';
import { CollectionVehicleSearchInfo } from './collection-vehicle.model';

@Injectable()
export class CollectionVehicleBusiness {
  constructor(
    private _vehicleEventRequest: VehicleEventRequestService,
    private _converter: CollectionVehicleConverter
  ) {}
  async init(searchInfo: CollectionVehicleSearchInfo) {
    let { Data } = await this._list(searchInfo);

    let res = this._converter.iterateToModel(Data);
    return res;
  }
  private _list(searchInfo: CollectionVehicleSearchInfo) {
    let params = new GetGarbageCollectionEventRecordsParams();

    params.BeginTime = searchInfo.BeginTime;
    params.EndTime = searchInfo.EndTime;

    return this._vehicleEventRequest.record.garbageCollection.list(params);
  }
}

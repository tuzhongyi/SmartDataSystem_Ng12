import { Injectable } from '@angular/core';
import { GetGarbageCollectionEventRecordsParams } from 'src/app/network/request/garbage_vehicles/vehicle-event/vehicle-event.params';
import { VehicleEventRequestService } from 'src/app/network/request/garbage_vehicles/vehicle-event/vehicle-event.service';
import { CollectionPointConverter } from './collection-point.converter';
import {
  CollectionPointModel,
  CollectionPointSearchInfo,
} from './collection-point.model';

@Injectable()
export class CollectionPointBusiness {
  constructor(
    private _vehicleEventRequest: VehicleEventRequestService,
    private _converter: CollectionPointConverter
  ) {}
  async init(searchInfo: CollectionPointSearchInfo) {
    let { Data } = await this._list(searchInfo);

    let res = this._converter.iterateToModel(Data);

    for (let i = 0; i < 10; i++) {
      let model = new CollectionPointModel();
      model.CollectionPointName = '垃圾房名称';
      model.Weight = Math.random() * 10;
      model.EventTime = new Date();

      res.push(model);
    }
    return res;
  }
  private _list(searchInfo: CollectionPointSearchInfo) {
    let params = new GetGarbageCollectionEventRecordsParams();

    params.BeginTime = searchInfo.BeginTime;
    params.EndTime = searchInfo.EndTime;

    return this._vehicleEventRequest.record.garbageCollection.list(params);
  }
}

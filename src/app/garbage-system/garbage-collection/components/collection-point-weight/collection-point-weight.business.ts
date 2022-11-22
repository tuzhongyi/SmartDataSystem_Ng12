import { Injectable } from '@angular/core';
import { GetGarbageCollectionEventRecordsParams } from 'src/app/network/request/garbage_vehicles/collection-event/collection-event.params';
import { CollectionEventRequestService } from 'src/app/network/request/garbage_vehicles/collection-event/collection-event.service';
import { CollectionPointWeightConverter } from './collection-point-weight.converter';
import {
  CollectionPointWeightModel,
  CollectionPointWeightSearchInfo,
} from './collection-point-weight.model';

@Injectable()
export class CollectionPointWeightBusiness {
  constructor(
    private _vehicleEventRequest: CollectionEventRequestService,
    private _converter: CollectionPointWeightConverter
  ) {}
  async init(searchInfo: CollectionPointWeightSearchInfo) {
    let { Data } = await this._list(searchInfo);

    let res = this._converter.iterateToModel(Data);

    for (let i = 0; i < 10; i++) {
      let model = new CollectionPointWeightModel();
      model.CollectionPointName = '垃圾房名称';
      model.Weight = Math.random() * 10;
      model.EventTime = new Date();

      res.push(model);
    }
    return res;
  }
  private _list(searchInfo: CollectionPointWeightSearchInfo) {
    let params = new GetGarbageCollectionEventRecordsParams();

    params.BeginTime = searchInfo.BeginTime;
    params.EndTime = searchInfo.EndTime;

    return this._vehicleEventRequest.record.garbageCollection.list(params);
  }
}

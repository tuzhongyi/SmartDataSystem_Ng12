import { Injectable } from '@angular/core';
import { GetGarbageCollectionEventRecordsParams } from 'src/app/network/request/garbage_vehicles/vehicle-event/vehicle-event.params';
import { VehicleEventRequestService } from 'src/app/network/request/garbage_vehicles/vehicle-event/vehicle-event.service';

import { CollectionStatisticConverter } from './collection-statistic.converter';
import { CollectionStatisticSearchInfo } from './collection-statistic.model';

@Injectable()
export class CollectionStatisticBusiness {
  constructor(
    private eventRequest: VehicleEventRequestService,
    private _converter: CollectionStatisticConverter
  ) {}

  async init(searchInfo: CollectionStatisticSearchInfo) {
    let { Data } = await this._list(searchInfo);

    let res = this._converter.Convert(Data, searchInfo.Type);
    return res;
  }
  private _list(searchInfo: CollectionStatisticSearchInfo) {
    let params = new GetGarbageCollectionEventRecordsParams();
    params.BeginTime = searchInfo.BeginTime;
    params.EndTime = searchInfo.EndTime;
    return this.eventRequest.record.garbageCollection.list(params);
  }
}

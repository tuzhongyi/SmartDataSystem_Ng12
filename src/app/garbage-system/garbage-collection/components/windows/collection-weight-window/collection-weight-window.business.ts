import { Injectable } from '@angular/core';
import { param } from 'jquery';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Time } from 'src/app/common/tools/time';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetGarbageCollectionEventRecordsParams } from 'src/app/network/request/garbage_vehicles/collection-event/collection-event.params';
import { CollectionEventRequestService } from 'src/app/network/request/garbage_vehicles/collection-event/collection-event.service';
import { GetCollectionPointsParams } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.params';
import { CollectionPointsRequestService } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.service';
import { GetGarbageVehiclesParams } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.params';

import { CollectionWeightWindowConverter } from './collection-weight-window.converter';
import {
  CollectionWeightWindowModel,
  ICollectionWeightWindowSearchInfo,
} from './collection-weight-window.model';

@Injectable()
export class CollectionWeightWindowBusiness {
  constructor(
    private _collectionEventRequest: CollectionEventRequestService,
    private _converter: CollectionWeightWindowConverter
  ) {}
  async init(searchInfo: ICollectionWeightWindowSearchInfo) {
    let { Page, Data } = await this._list(searchInfo);
    // Data = [...Data, ...Data];

    console.log(Data);
    let data = await this._converter.iterateToModel(Data);
    let res: PagedList<CollectionWeightWindowModel> = {
      Page: Page,
      Data: data,
    };

    return res;
  }
  private _list(searchInfo: ICollectionWeightWindowSearchInfo) {
    let params = new GetGarbageCollectionEventRecordsParams();
    params.PageIndex = searchInfo.PageIndex;
    params.PageSize = searchInfo.PageSize;
    params.BeginTime = searchInfo.BeginTime;
    params.EndTime = searchInfo.EndTime;
    params.DivisionIds = searchInfo.DivisionIds;
    params.ResourceName = searchInfo.Condition;
    return this._collectionEventRequest.record.garbageCollection.list(params);
  }
}

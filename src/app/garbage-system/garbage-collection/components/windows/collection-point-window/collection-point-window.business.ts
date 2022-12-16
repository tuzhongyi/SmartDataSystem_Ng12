import { Injectable } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetCollectionPointsParams } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.params';
import { CollectionPointsRequestService } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.service';
import { GetGarbageVehiclesParams } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.params';

import { CollectionPointWindowConverter } from './collection-point-window.converter';
import {
  CollectionPointWindowModel,
  ICollectionPointWindowSearchInfo,
} from './collection-point-window.model';

@Injectable()
export class CollectionPointWindowBusiness {
  constructor(
    private _globalStorageService: GlobalStorageService,
    private _collectionPointsRequest: CollectionPointsRequestService,
    private _converter: CollectionPointWindowConverter
  ) {}
  async init(searchInfo: ICollectionPointWindowSearchInfo) {
    let { Page, Data } = await this._list(searchInfo);
    // Data = [...Data, ...Data];
    let data = await this._converter.iterateToModel(Data);
    let res: PagedList<CollectionPointWindowModel> = {
      Page: Page,
      Data: data,
    };

    return res;
  }
  private _list(searchInfo: ICollectionPointWindowSearchInfo) {
    let params = new GetCollectionPointsParams();
    params.PageIndex = searchInfo.PageIndex;
    params.PageSize = searchInfo.PageSize;
    if (
      this._globalStorageService.defaultDivisionId !==
      this._globalStorageService.divisionId
    )
      params.DivisionIds = searchInfo.DivisionIds;
    params.Name = searchInfo.Condition;

    return this._collectionPointsRequest.list(params);
  }
}

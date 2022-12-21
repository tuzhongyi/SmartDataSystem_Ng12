import { Injectable } from '@angular/core';
import { param } from 'jquery';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Language } from 'src/app/common/tools/language';
import { Medium } from 'src/app/common/tools/medium';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetGarbageCollectionEventRecordsParams } from 'src/app/network/request/garbage_vehicles/collection-event/collection-event.params';
import { CollectionEventRequestService } from 'src/app/network/request/garbage_vehicles/collection-event/collection-event.service';
import { GarbageVehicleRequestService } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.service';

import { CollectionRecordWindowConverter } from './collection-record-window.converter';
import {
  CollectionRecordWindowModel,
  ICollectionRecordWindowSearchInfo,
} from './collection-record-window.model';

@Injectable()
export class CollectionRecordWindowBusiness {
  constructor(
    private _globalStorageService: GlobalStorageService,

    private _collectionEventRequest: CollectionEventRequestService,
    private _garbageVehicleRequest: GarbageVehicleRequestService,
    private _converter: CollectionRecordWindowConverter
  ) {}
  async init(searchInfo: ICollectionRecordWindowSearchInfo) {
    let { Page, Data } = await this._list(searchInfo);
    // Data = [...Data, ...Data];

    // console.log(Data);
    let data = await this._converter.iterateToModel(Data);
    let res: PagedList<CollectionRecordWindowModel> = {
      Page: Page,
      Data: data,
    };

    return res;
  }
  private _list(searchInfo: ICollectionRecordWindowSearchInfo) {
    let params = new GetGarbageCollectionEventRecordsParams();
    params.PageIndex = searchInfo.PageIndex;
    params.PageSize = searchInfo.PageSize;
    params.BeginTime = searchInfo.BeginTime;
    params.EndTime = searchInfo.EndTime;
    params.DivisionIds = searchInfo.DivisionIds;

    if (searchInfo.DivisionIds.length == 1) {
      if (
        searchInfo.DivisionIds[0] ==
        this._globalStorageService.defaultDivisionId
      ) {
        params.DivisionIds = [];
      }
    }

    if (searchInfo.Score) {
      params.Score = searchInfo.Score;
    }

    params.ResourceName = searchInfo.Condition;
    return this._collectionEventRequest.record.garbageCollection.list(params);
  }

  getVehicle(vehicleId: string) {
    return this._garbageVehicleRequest.get(vehicleId);
  }
  getCamera(vehicleId: string, cameraId: string) {
    return this._garbageVehicleRequest.camera.get(vehicleId, cameraId);
  }
}

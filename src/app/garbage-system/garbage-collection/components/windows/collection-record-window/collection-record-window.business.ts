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

    console.log(Data);
    let data = await this._converter.iterateToModel(Data);
    for (let i = 0; i < 0; i++) {
      let model = new CollectionRecordWindowModel();
      model.Id = ((Math.random() * 1111) >> 0).toString();
      model.ResourceName = Language.json.Unknow;
      model.VehicleName = '121';
      model.MemberName = '121';
      model.DivisionName = '121';
      model.TrashCanName = '121';
      model.CollectionPointName = '121';
      model.Weight = 12;
      model.Score = '121';

      model.ImageUrl = await Medium.img(void 0);

      data.push(model);
    }
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

  public async getCamera(vehicleId: string, cameraId: string) {
    return this._garbageVehicleRequest.camera.get(
      '1',
      '83f688554c2e44d0b8b7a7237724b090'
    );
  }
}

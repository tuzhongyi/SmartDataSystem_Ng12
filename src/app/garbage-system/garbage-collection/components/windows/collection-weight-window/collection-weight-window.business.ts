import { Injectable } from '@angular/core';
import { param } from 'jquery';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Language } from 'src/app/common/tools/language';
import { Medium } from 'src/app/common/tools/medium';
import { Time } from 'src/app/common/tools/time';
import { ImageControlConverter } from 'src/app/converter/image-control.converter';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetGarbageCollectionEventRecordsParams } from 'src/app/network/request/garbage_vehicles/collection-event/collection-event.params';
import { CollectionEventRequestService } from 'src/app/network/request/garbage_vehicles/collection-event/collection-event.service';
import { GetCollectionPointsParams } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.params';
import { CollectionPointsRequestService } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.service';
import { GetGarbageVehiclesParams } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.params';
import { GarbageVehicleRequestService } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.service';

import { CollectionWeightWindowConverter } from './collection-weight-window.converter';
import {
  CollectionWeightWindowModel,
  ICollectionWeightWindowSearchInfo,
} from './collection-weight-window.model';

@Injectable()
export class CollectionWeightWindowBusiness {
  constructor(
    private _globalStorageService: GlobalStorageService,

    private _collectionEventRequest: CollectionEventRequestService,
    private _garbageVehicleRequest: GarbageVehicleRequestService,
    private _converter: CollectionWeightWindowConverter,
    private _imageControlConverter: ImageControlConverter
  ) {}
  async init(searchInfo: ICollectionWeightWindowSearchInfo) {
    let { Page, Data } = await this._list(searchInfo);
    // Data = [...Data, ...Data];

    console.log(Data);
    let data = await this._converter.iterateToModel(Data);
    for (let i = 0; i < 0; i++) {
      let model = new CollectionWeightWindowModel();
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
    if (
      this._globalStorageService.defaultDivisionId !==
      this._globalStorageService.divisionId
    )
      params.DivisionIds = searchInfo.DivisionIds;
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

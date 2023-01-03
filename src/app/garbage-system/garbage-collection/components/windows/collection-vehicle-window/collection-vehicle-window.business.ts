import { Injectable } from '@angular/core';
import { param } from 'jquery';
import { filter } from 'jszip';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Flags } from 'src/app/common/tools/flags';
import { CollectionDeviceStateCountType } from 'src/app/enum/collection-device-state.enum';
import { VehicleState } from 'src/app/enum/vehicle-state.enum';
import { VehicleType } from 'src/app/enum/vehicle-type.enum';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetGarbageVehiclesParams } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.params';

import { GarbageVehicleRequestService } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.service';
import { CollectionVehicleWindowConverter } from './collection-vehicle-window.converter';
import {
  CollectionVehicleWindowModel,
  ICollectionVehicleWindowSearchInfo,
} from './collection-vehicle-window.model';

@Injectable()
export class CollectionVehicleWindowBusiness {
  constructor(
    private _globalStorageService: GlobalStorageService,

    private _garbageVehicleRequest: GarbageVehicleRequestService,
    private _converter: CollectionVehicleWindowConverter
  ) {}
  async init(searchInfo: ICollectionVehicleWindowSearchInfo) {
    let { Page, Data } = await this._list(searchInfo);

    // console.log(Data);
    // Data = [...Data, ...Data, ...Data];

    let data = await this._converter.iterateToModel(Data);
    let res: PagedList<CollectionVehicleWindowModel> = {
      Page: Page,
      Data: data,
    };

    return res;
  }
  private _list(searchInfo: ICollectionVehicleWindowSearchInfo) {
    let params = new GetGarbageVehiclesParams();
    params.PageIndex = searchInfo.PageIndex;
    params.PageSize = searchInfo.PageSize;
    params.Name = searchInfo.Condition;
    params.PlateNo = searchInfo.PlatNo;
    params.DivisionId = searchInfo.DivisionId;
    if (searchInfo.Type) {
      params.VehicleType = searchInfo.Type;
    }

    if (searchInfo.State == CollectionDeviceStateCountType.Online) {
      params.State = 0;
    } else if (searchInfo.State == CollectionDeviceStateCountType.Offline) {
      params.State = VehicleState.Offline;
    }
    return this._garbageVehicleRequest.list(params);
  }
}

import { Injectable } from '@angular/core';
import { param } from 'jquery';
import { filter } from 'jszip';
import { Flags } from 'src/app/common/tools/flags';
import { CollectionDeviceStateCountType } from 'src/app/enum/collection-device-state.enum';
import { VehicleState } from 'src/app/enum/vehicle-state.enum';
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
    private _garbageVehicleRequest: GarbageVehicleRequestService,
    private _converter: CollectionVehicleWindowConverter
  ) {}
  async init(searchInfo: ICollectionVehicleWindowSearchInfo) {
    let { Page, Data } = await this._list(searchInfo);

    // console.log(Data);

    let data = this._converter.iterateToModel(Data);
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
    params.DivisionId = searchInfo.DivisionId;
    params.Name = searchInfo.Condition;

    if (searchInfo.Type == CollectionDeviceStateCountType.Online) {
      params.State = 0;
    } else if (searchInfo.Type == CollectionDeviceStateCountType.Offline) {
      params.State = VehicleState.Offline;
    }
    return this._garbageVehicleRequest.list(params);
  }
}

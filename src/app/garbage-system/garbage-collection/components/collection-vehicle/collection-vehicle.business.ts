import { Injectable } from '@angular/core';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { GetGarbageVehiclesParams } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.params';

import { GarbageVehicleRequestService } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.service';
import { CollectionVehicleConverter } from './collection-vehicle.converter';
import { ICollectionVehicleSearchInfo } from './collection-vehicle.model';

@Injectable()
export class CollectionVehicleBusiness {
  constructor(
    private _garbageVehicleRequest: GarbageVehicleRequestService,
    private _converter: CollectionVehicleConverter
  ) {}
  async init(searchInfo: ICollectionVehicleSearchInfo) {
    let { Data } = await this._list(searchInfo);
    Data = Data.sort((a, b) => {
      return LocaleCompare.compare(b.Name, a.Name);
    });
    let res = this._converter.iterateToModel(Data);

    return res;
  }
  private _list(searchInfo: ICollectionVehicleSearchInfo) {
    let params = new GetGarbageVehiclesParams();
    if (searchInfo.PageIndex) params.PageIndex = searchInfo.PageIndex;
    if (searchInfo.PageSize) params.PageSize = searchInfo.PageSize;
    if (searchInfo.DivisionId) params.AncestorId = searchInfo.DivisionId;

    return this._garbageVehicleRequest.list(params);
  }
}

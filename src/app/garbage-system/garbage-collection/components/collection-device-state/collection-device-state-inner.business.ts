import { Injectable } from '@angular/core';

import { CommonGaugeChartConverter } from 'src/app/common/components/common-gauge-chart/common-gauge-chart.converter';
import { ICommonGaugeCharBusiness } from 'src/app/common/components/common-gauge-chart/common-gauge-chart.model';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { GetGarbageVehiclesParams } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.params';
import { GarbageVehicleRequestService } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.service';
import { ICollectionDeviceStateSearchInfo } from './collection-device-state.model';

@Injectable()
export class CollectionDeviceStateInnerBusiness
  implements ICommonGaugeCharBusiness
{
  searchInfo: ICollectionDeviceStateSearchInfo = {};
  constructor(
    _globalStorage: GlobalStorageService,

    private _garbageVehicleRequest: GarbageVehicleRequestService,
    private _converter: CommonGaugeChartConverter
  ) {
    _globalStorage.division.promise.selected.then((x) => {
      this.searchInfo.DivisionId = x.Id;
    });
  }

  async init() {
    let { Data } = await this._listGarbageVehicle();

    let res = this._converter.Convert(Data);

    return res;
  }
  private _listGarbageVehicle() {
    let params = new GetGarbageVehiclesParams();
    if (this.searchInfo.PageIndex) params.PageIndex = this.searchInfo.PageIndex;
    if (this.searchInfo.PageSize) params.PageSize = this.searchInfo.PageSize;
    if (this.searchInfo.DivisionId)
      params.DivisionId = this.searchInfo.DivisionId;

    return this._garbageVehicleRequest.list(params);
  }
}

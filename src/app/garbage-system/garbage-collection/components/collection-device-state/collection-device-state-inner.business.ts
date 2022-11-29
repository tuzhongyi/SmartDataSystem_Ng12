import { Injectable } from '@angular/core';

import { CollectionDeviceStateConverter } from './collection-device-state.converter';
import { GarbageVehicleRequestService } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.service';
import { GetGarbageVehiclesParams } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.params';
import { ICommonGaugeCharBusiness } from 'src/app/common/components/common-gauge-chart/common-gauge-chart.model';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { ICollectionDeviceStateSearchInfo } from './collection-device-state.model';
import { CommonGaugeChartConverter } from 'src/app/common/components/common-gauge-chart/common-gauge-chart.converter';

@Injectable()
export class CollectionDeviceStateInnerBusiness
  implements ICommonGaugeCharBusiness
{
  searchInfo: ICollectionDeviceStateSearchInfo = {
    DivisionId: this._globalStorage.divisionId,
  };
  constructor(
    private _globalStorage: GlobalStorageService,

    private _garbageVehicleRequest: GarbageVehicleRequestService,
    private _converter: CommonGaugeChartConverter
  ) {}

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

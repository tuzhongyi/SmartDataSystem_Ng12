import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import {
  ISubscription,
  SubscriptionService,
} from 'src/app/common/interfaces/subscribe.interface';
import {
  DeviceStateCountType,
  DeviceStateRatioType,
} from 'src/app/enum/device-state-count.enum';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { GlobalStoreService } from 'src/app/common/service/global-store.service';
import { Language } from 'src/app/common/tools/language';
import { DivisionNumberStatistic } from 'src/app/network/model/division-number-statistic.model';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import {
  DeviceStateCountModel,
  IDeviceStateDes,
} from 'src/app/view-model/device-state-count.model';
import { GarbageVehicleRequestService } from 'src/app/network/request/garbage-vehicle/garbage-vehicle.service';
import { GetGarbageVehiclesParams } from 'src/app/network/request/garbage-vehicle/garbage-vehicle.params';
import { CollectionVehicleConverter } from './collection-device-state.converter';

@Injectable()
export class CollectionDeviceStateBusiness {
  constructor(
    private _garbageVehicleRequest: GarbageVehicleRequestService,
    private _converter: CollectionVehicleConverter
  ) { }

  async init() {
    let { Data } = await this._listGarbageVehicle();
    let res = this._converter.Convert(Data)
    return res;
  }
  private _listGarbageVehicle() {
    let params = new GetGarbageVehiclesParams();
    return this._garbageVehicleRequest.list(params);
  }
}


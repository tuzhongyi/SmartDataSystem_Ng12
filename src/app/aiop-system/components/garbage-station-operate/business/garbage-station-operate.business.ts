import { EventEmitter, Injectable } from '@angular/core';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { IGarbageStationOperateBusiness } from '../garbage-station-operate.model';
import { GarbageStationOperateCameraBusiness } from './garbage-station-operate-camera.business';
import { GarbageStationOperateStationTypeBusiness } from './garbage-station-operate-station-type.business';

@Injectable()
export class GarbageStationOperateBusiness
  implements IGarbageStationOperateBusiness
{
  constructor(
    private service: GarbageStationRequestService,
    public camera: GarbageStationOperateCameraBusiness,
    public type: GarbageStationOperateStationTypeBusiness
  ) {}
  Converter?:
    | IConverter<GarbageStation, GarbageStation>
    | IPromiseConverter<GarbageStation, GarbageStation>
    | undefined;
  subscription?: ISubscription | undefined;
  loading?: EventEmitter<void> | undefined;
  load(stationId: string): Promise<GarbageStation> {
    return this.getData(stationId);
  }
  getData(stationId: string): Promise<GarbageStation> {
    return this.service.get(stationId);
  }

  create(station: GarbageStation) {
    return this.service.create(station);
  }
  update(station: GarbageStation) {
    return this.service.update(station);
  }
}

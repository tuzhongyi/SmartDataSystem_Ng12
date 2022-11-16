import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { GisRoutePoint } from 'src/app/network/model/gis-point.model';
import { GetGarbageVehicleRouteParams } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.params';
import { GarbageVehicleRequestService } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.service';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { GisRoutePointModel } from 'src/app/network/view-model/gis-route-point.view-model';

@Injectable()
export class CollectionMapRouteControlBusiness
  implements IBusiness<GisRoutePoint[]>
{
  constructor(private service: GarbageVehicleRequestService) {}

  async load(vehicleId: string, date: Date): Promise<GisRoutePoint[]> {
    let duration = DurationParams.allDay(date);
    let data = await this.getData(vehicleId, duration);
    return data;
  }
  async getData(
    vehicleId: string,
    duration: DurationParams
  ): Promise<GisRoutePoint[]> {
    let params = new GetGarbageVehicleRouteParams();
    params.VehicleId = vehicleId;
    params.BeginTime = duration.BeginTime;
    params.EndTime = duration.EndTime;
    let paged = await this.service.route.list(params);
    return paged.Data;
  }
}

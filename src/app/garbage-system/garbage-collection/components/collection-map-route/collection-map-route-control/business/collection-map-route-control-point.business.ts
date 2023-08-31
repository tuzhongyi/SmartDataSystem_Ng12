import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { Duration } from 'src/app/network/model/duration.model';
import { GisRoutePoint } from 'src/app/network/model/gis-point.model';
import { GetGarbageVehicleRouteParams } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.params';
import { GarbageVehicleRequestService } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.service';

@Injectable()
export class CollectionMapRouteControlPointBusiness
  implements IBusiness<GisRoutePoint[]>
{
  constructor(private service: GarbageVehicleRequestService) {}

  async load(vehicleId: string, duration: Duration): Promise<GisRoutePoint[]> {
    let data = await this.getData(vehicleId, duration);
    data.map((x) => {
      let second = x.Time.getSeconds() % 5;
      x.Time.setSeconds(x.Time.getSeconds() - second, 0);
      return x;
    });
    return data;
  }
  async getData(
    vehicleId: string,
    duration: Duration
  ): Promise<GisRoutePoint[]> {
    let params = new GetGarbageVehicleRouteParams();
    params.VehicleId = vehicleId;
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    return this.service.route.all(params);
  }
}

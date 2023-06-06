import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { Duration } from 'src/app/network/model/duration.model';
import { VehicleOnlineEventRecord } from 'src/app/network/model/vehicle-event-record.model';
import { GetVehicleOnlineEventRecordsParams } from 'src/app/network/request/garbage_vehicles/collection-event/collection-event.params';
import { CollectionEventRequestService } from 'src/app/network/request/garbage_vehicles/collection-event/collection-event.service';

@Injectable()
export class CollectionMapRouteControlOnlineBusiness
  implements IBusiness<VehicleOnlineEventRecord[]>
{
  constructor(private service: CollectionEventRequestService) {}

  async load(
    vehicleId: string,
    duration: Duration
  ): Promise<VehicleOnlineEventRecord[]> {
    let data = await this.getData(vehicleId, duration);
    return data;
  }
  async getData(
    vehicleId: string,
    duration: Duration
  ): Promise<VehicleOnlineEventRecord[]> {
    let params = new GetVehicleOnlineEventRecordsParams();
    params.VehicleIds = [vehicleId];
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.Desc = false;
    let paged = await this.service.record.vehicleOnline.list(params);
    return paged.Data;
  }
}

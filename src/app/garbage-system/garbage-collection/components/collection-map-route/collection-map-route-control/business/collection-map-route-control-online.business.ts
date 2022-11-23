import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { VehicleOnlineEventRecord } from 'src/app/network/model/vehicle-event-record.model';
import { GetVehicleOnlineEventRecordsParams } from 'src/app/network/request/garbage_vehicles/vehicle-event/vehicle-event.params';
import { VehicleEventRequestService } from 'src/app/network/request/garbage_vehicles/vehicle-event/vehicle-event.service';
import { DurationParams } from 'src/app/network/request/IParams.interface';

@Injectable()
export class CollectionMapRouteControlOnlineBusiness
  implements IBusiness<VehicleOnlineEventRecord[]>
{
  constructor(private service: VehicleEventRequestService) {}

  async load(
    vehicleId: string,
    date: Date
  ): Promise<VehicleOnlineEventRecord[]> {
    let duration = DurationParams.allDay(date);
    let data = await this.getData(vehicleId, duration);
    return data;
  }
  async getData(
    vehicleId: string,
    duration: DurationParams
  ): Promise<VehicleOnlineEventRecord[]> {
    let params = new GetVehicleOnlineEventRecordsParams();
    params.VehicleIds = [vehicleId];
    params.BeginTime = duration.BeginTime;
    params.EndTime = duration.EndTime;
    params.Desc = false;
    let paged = await this.service.record.vehicleOnline.list(params);
    return paged.Data;
  }
}

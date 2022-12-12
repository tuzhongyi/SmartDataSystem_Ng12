import { Injectable } from '@angular/core';
import { IGet } from 'src/app/common/interfaces/bussiness.interface';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { GetGarbageVehiclesParams } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.params';
import { GarbageVehicleRequestService } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.service';

@Injectable()
export class GarbageVehicleCameraDetailsWindowBusiness
  implements IGet<GarbageVehicle[]>
{
  constructor(private service: GarbageVehicleRequestService) {}
  async get(...args: any[]): Promise<GarbageVehicle[]> {
    let params = new GetGarbageVehiclesParams();
    let paged = await this.service.list(params);
    return paged.Data;
  }
}

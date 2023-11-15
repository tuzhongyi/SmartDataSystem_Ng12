import { Injectable } from '@angular/core';
import { GetGarbageVehiclesParams } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.params';
import { GarbageVehicleRequestService } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.service';

@Injectable()
export class GarbageVehicleTreeVehicleBusiness {
  constructor(private service: GarbageVehicleRequestService) {}

  async getByDivisionId(divisionId: string) {
    let params = new GetGarbageVehiclesParams();
    params.DivisionId = divisionId;
    let paged = await this.service.list(params);
    return paged.Data;
  }
  async getByName(name?: string) {
    let params = new GetGarbageVehiclesParams();
    params.Name = name;
    let paged = await this.service.list(params);
    return paged.Data;
  }

  async all() {
    let paged = await this.service.list();
    return paged.Data;
  }
}

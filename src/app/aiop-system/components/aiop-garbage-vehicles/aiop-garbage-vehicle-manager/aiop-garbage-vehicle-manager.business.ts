import { Injectable } from '@angular/core';
import { GarbageVehicle } from 'src/app/network/model/garbage-station/garbage-vehicle.model';

import { GarbageVehicleRequestService } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.service';

@Injectable()
export class GarbageVehicleManageBusiness {
  constructor(private service: GarbageVehicleRequestService) {}

  async download(...args: any[]) {
    this.service.excel.get('清运车信息');
  }
  upload(data: ArrayBuffer) {
    return this.service.excel.post(data);
  }
  delete(ids: string[]): Promise<GarbageVehicle[]> {
    let all = ids.map((x) => this.service.delete(x));
    return Promise.all(all);
  }
}

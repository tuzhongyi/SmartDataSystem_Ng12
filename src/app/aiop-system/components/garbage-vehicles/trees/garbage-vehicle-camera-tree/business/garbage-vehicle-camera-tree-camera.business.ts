import { Injectable } from '@angular/core';
import { GetGarbageVehicleCamerasParams } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.params';
import { GarbageVehicleRequestService } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.service';

@Injectable()
export class GarbageVehicleCameraTreeCameraBusiness {
  constructor(private service: GarbageVehicleRequestService) {}
  getByName(name?: string) {
    let params = new GetGarbageVehicleCamerasParams();
    params.Name = name;
    return this.service.camera.list(params);
  }

  getByParentId(ids: string[]) {
    let params = new GetGarbageVehicleCamerasParams();
    params.GarbageVehicleIds = ids;
    return this.service.camera.list(params);
  }

  async all() {
    let paged = await this.service.camera.list();
    return paged.Data;
  }
}

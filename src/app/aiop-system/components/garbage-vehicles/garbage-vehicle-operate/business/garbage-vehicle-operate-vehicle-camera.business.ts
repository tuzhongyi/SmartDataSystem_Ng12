import { Injectable } from '@angular/core';
import {
  IBusiness,
  ICreate,
  IDelete,
} from 'src/app/common/interfaces/bussiness.interface';
import { VehicleCamera } from 'src/app/network/model/vehicle-camera.model';
import { GarbageVehicleRequestService } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.service';

@Injectable()
export class GarbageVehicleOperateVehicleCameraBusiness
  implements
    IBusiness<VehicleCamera[]>,
    IDelete<VehicleCamera>,
    ICreate<VehicleCamera>
{
  constructor(private service: GarbageVehicleRequestService) {}
  create(camera: VehicleCamera): Promise<VehicleCamera> {
    return this.service.camera.create(camera);
  }
  delete(vehicleId: string, cameraId: string): Promise<VehicleCamera> {
    return this.service.camera.delete(vehicleId, cameraId);
  }

  async load(...args: any): Promise<VehicleCamera[]> {
    let data = await this.getData();
    return data;
  }
  async getData(...args: any): Promise<VehicleCamera[]> {
    let paged = await this.service.camera.list();
    return paged.Data;
  }
}

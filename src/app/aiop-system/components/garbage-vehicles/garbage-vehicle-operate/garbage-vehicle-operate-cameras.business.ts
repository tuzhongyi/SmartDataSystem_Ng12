import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  IBusiness,
  ICreate,
  IDelete,
} from 'src/app/common/interfaces/bussiness.interface';
import { VehicleType } from 'src/app/enum/vehicle-type.enum';
import { VehicleCamera } from 'src/app/network/model/vehicle-camera.model';
import { GetGarbageVehicleCamerasParams } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.params';
import { GarbageVehicleRequestService } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.service';

@Injectable()
export class GarbageVehicleOperateCamerasBusiness
  implements
    IBusiness<VehicleCamera[], VehicleCamera[]>,
    ICreate<VehicleCamera>,
    IDelete<VehicleCamera>
{
  constructor(private service: GarbageVehicleRequestService) {}

  datas = new BehaviorSubject<VehicleCamera[]>([]);

  async load(name?: string): Promise<VehicleCamera[]> {
    let data = await this.getData(name);
    this.datas.next(data);
    return data;
  }
  async getData(name?: string): Promise<VehicleCamera[]> {
    let params = new GetGarbageVehicleCamerasParams();
    params.Name = name;
    let paged = await this.service.camera.list(params);
    return paged.Data;
  }

  create(model: VehicleCamera): Promise<VehicleCamera> {
    return this.service.camera.create(model);
  }
  delete(vehicleId: string, cameraId: string): Promise<VehicleCamera> {
    return this.service.camera.delete(vehicleId, cameraId);
  }
}

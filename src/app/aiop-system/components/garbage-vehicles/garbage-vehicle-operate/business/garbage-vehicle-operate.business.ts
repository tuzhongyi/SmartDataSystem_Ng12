import { Injectable } from '@angular/core';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { GarbageVehicleRequestService } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.service';
import { IGarbageVehicleOperateBusiness } from '../garbage-vehicle-operate.model';
import { GarbageVehicleOperateCameraBusiness } from './garbage-vehicle-operate-camera.business';

@Injectable()
export class GarbageVehicleOperateBusiness
  implements IGarbageVehicleOperateBusiness
{
  constructor(
    private service: GarbageVehicleRequestService,
    public camera: GarbageVehicleOperateCameraBusiness
  ) {}
  load(vehicleId: string): Promise<GarbageVehicle> {
    return this.getData(vehicleId);
  }
  getData(vehicleId: string): Promise<GarbageVehicle> {
    return this.service.get(vehicleId);
  }

  create(vehicle: GarbageVehicle) {
    return this.service.create(vehicle);
  }
  update(vehicle: GarbageVehicle) {
    return this.service.update(vehicle);
  }
}

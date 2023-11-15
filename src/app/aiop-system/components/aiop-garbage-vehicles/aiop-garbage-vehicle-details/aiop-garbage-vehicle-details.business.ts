import { Injectable } from '@angular/core';
import { GarbageVehicle } from 'src/app/network/model/garbage-station/garbage-vehicle.model';
import { GarbageVehicleRequestService } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.service';

@Injectable()
export class AIOPGarbageVehicleDetailsBusiness {
  constructor(private service: GarbageVehicleRequestService) {}

  update(model: GarbageVehicle) {
    model.Cameras = undefined;
    model.GarbageVehicleParameters = undefined;
    model.UpdateTime = new Date();
    return this.service.update(model);
  }
}

import { Injectable } from '@angular/core';
import { GarbageVehicleCameraConverter } from 'src/app/converter/garbage-vehicle-camera.converter';
import { AICamera } from 'src/app/network/model/ai-camera.model';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { VehicleCamera } from 'src/app/network/model/vehicle-camera.model';
import { GarbageVehicleRequestService } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.service';
import { IGarbageVehicleCameraBindingBusiness } from './garbage-vehicle-camera-binding.model';

@Injectable()
export class GarbageVehicleCameraBindingBusiness
  implements IGarbageVehicleCameraBindingBusiness
{
  cameras: VehicleCamera[] = [];
  converter = new GarbageVehicleCameraConverter();

  constructor(private service: GarbageVehicleRequestService) {
    this.load();
  }
  delete(vehicleId: string, cameraIds: string[]): Promise<VehicleCamera[]> {
    let all = cameraIds.map((x) => {
      return this.service.camera.delete(vehicleId, x);
    });
    return Promise.all(all).then((x) => {
      this.load();
      return x;
    });
  }

  create(vehicleId: string, cameras: AICamera[]): Promise<VehicleCamera[]> {
    let all = cameras
      .filter((x) => {
        return !this.cameras.some((y) => y.Id === x.Id);
      })
      .map((x) => {
        let camera = this.converter.Convert(x, vehicleId);
        return this.service.camera.create(camera);
      });
    return Promise.all(all).then((x) => {
      this.load();
      return x;
    });
  }

  async load() {
    let paged = await this.service.camera.list();
    this.cameras = paged.Data;
  }
}

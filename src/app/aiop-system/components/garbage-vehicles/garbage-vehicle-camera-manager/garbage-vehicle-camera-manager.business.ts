import { Injectable } from '@angular/core';
import { VehicleCamera } from 'src/app/network/model/garbage-station/vehicle-camera.model';
import { GarbageVehicleRequestService } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.service';
import { IGarbageVehicleCameraManagerBusiness } from './garbage-vehicle-camera-manager.model';

@Injectable()
export class GarbageVehicleCameraManagerBusiness
  implements IGarbageVehicleCameraManagerBusiness
{
  constructor(private service: GarbageVehicleRequestService) {}
  async download() {
    let data = (await this.service.camera.excel()) as Blob;
    let url = window.URL.createObjectURL(data);
    let a = document.createElement('a');

    document.body.appendChild(a);
    a.href = url;
    a.download = '摄像机信息';
    a.click();

    document.body.removeChild(a);
  }

  upload(buffer: ArrayBuffer) {
    return this.service.camera.excel(buffer);
  }
  get(vehicleId: string, id: string): Promise<VehicleCamera> {
    return this.service.camera.get(vehicleId, id);
  }
  create(model: VehicleCamera): Promise<VehicleCamera> {
    return this.service.camera.create(model);
  }
  update(model: VehicleCamera): Promise<VehicleCamera> {
    return this.service.camera.update(model);
  }
  delete(cameras: VehicleCamera[]): Promise<VehicleCamera[]> {
    let array = new Array<Promise<VehicleCamera>>();
    cameras.forEach((x) => {
      let promise = this.service.camera.delete(x.GarbageVehicleId, x.Id);
      array.push(promise);
    });
    return Promise.all(array);
  }
}

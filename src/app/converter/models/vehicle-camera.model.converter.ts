import { Injectable } from '@angular/core';
import { classToPlain, plainToClass } from 'class-transformer';
import { GarbageVehicleRequestService } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.service';
import { IConverter } from '../../common/interfaces/converter.interface';
import { VehicleCamera } from '../../network/model/vehicle-camera.model';
import { VehicleCameraModel } from '../../network/view-model/vehicle-camera.view-model';

@Injectable({
  providedIn: 'root',
})
export class VehicleCameraModelConverter
  implements IConverter<VehicleCamera, VehicleCameraModel>
{
  constructor(private service: GarbageVehicleRequestService) {}
  Convert(source: VehicleCamera, ...res: any[]): VehicleCameraModel {
    let plain = classToPlain(source);
    let model = plainToClass(VehicleCameraModel, plain);
    model.GarbageVehicle = this.service.get(source.GarbageVehicleId);
    return model;
  }
}

import { EventEmitter, Injectable } from '@angular/core';
import {
  IBusiness,
  ICreate,
  IUpdate,
} from 'src/app/common/interfaces/bussiness.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { AICameraManageConverter } from 'src/app/converter/ai-camera-manage.converter';
import { Camera } from 'src/app/network/model/camera.model';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { GetCamerasParams } from 'src/app/network/request/ai-camera/ai-camera.params';
import { AICameraRequestService } from 'src/app/network/request/ai-camera/ai-camera.service';
import { GarbageVehicleRequestService } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.service';
import { GarbageVehicleOperateCamerasBusiness } from './garbage-vehicle-operate-cameras.business';

@Injectable()
export class GarbageVehicleOperateBusiness
  implements
    IBusiness<GarbageVehicle, GarbageVehicle>,
    IUpdate<GarbageVehicle>,
    ICreate<GarbageVehicle>
{
  constructor(
    private service: GarbageVehicleRequestService,
    public camera: GarbageVehicleOperateCamerasBusiness
  ) {}

  async load(vehicle?: GarbageVehicle): Promise<GarbageVehicle> {
    // let data = await this.getData(vehicleId);
    this.camera.load();
    // return data;
    let data = vehicle ?? GarbageVehicle.Create();
    return data;
  }
  getData(vehicleId: string): Promise<GarbageVehicle> {
    return this.service.get(vehicleId);
  }

  getGarbageVehicle(id: string) {
    return this.service.get(id);
  }

  update(model: GarbageVehicle): Promise<GarbageVehicle> {
    return this.service.update(model);
  }
  create(model: GarbageVehicle): Promise<GarbageVehicle> {
    return this.service.create(model);
  }
}

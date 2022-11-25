import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { AICameraManageConverter } from 'src/app/converter/ai-camera-manage.converter';
import { AICamera } from 'src/app/network/model/ai-camera.model';
import { VehicleCamera } from 'src/app/network/model/vehicle-camera.model';
import { AICameraManageModel } from 'src/app/view-model/ai-camera-manage.model';
import { GarbageVehicleOperateCameraConverter } from '../converter/garbage-vehicle-operate-camera.converter';

@Injectable()
export class GarbageVehicleOperateCameraBusiness
  implements IBusiness<AICamera, VehicleCamera>
{
  constructor() {}
  Converter = new GarbageVehicleOperateCameraConverter();
  load(...args: any): Promise<VehicleCamera> {
    throw new Error('Method not implemented.');
  }
  getData(...args: any): Promise<AICamera> {
    throw new Error('Method not implemented.');
  }
}

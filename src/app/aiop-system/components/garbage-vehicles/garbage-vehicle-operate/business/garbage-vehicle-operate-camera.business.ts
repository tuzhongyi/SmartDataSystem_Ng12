import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { AICamera } from 'src/app/network/model/garbage-station/ai-camera.model';
import { VehicleCamera } from 'src/app/network/model/garbage-station/vehicle-camera.model';
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

import { Injectable } from '@angular/core';
import { AICameraManageConverter } from 'src/app/converter/ai-camera-manage.converter';
import { AICamera } from 'src/app/network/model/ai-camera.model';
import { VehicleCamera } from 'src/app/network/model/vehicle-camera.model';
import { AICameraManageModel } from 'src/app/view-model/ai-camera-manage.model';
import { ICameraBusiness } from '../garbage-vehicle-operate.model';
import { GarbageVehicleOperateAICameraBusiness } from './garbage-vehicle-operate-ai-camera.business';
import { GarbageVehicleOperateVehicleCameraBusiness } from './garbage-vehicle-operate-vehicle-camera.business';

@Injectable()
export class GarbageVehicleOperateCameraBusiness implements ICameraBusiness {
  constructor(
    public ai: GarbageVehicleOperateAICameraBusiness,
    public vehicle: GarbageVehicleOperateVehicleCameraBusiness,
    public converter: AICameraManageConverter
  ) {}
  getData(...args: any): Promise<AICamera[] | VehicleCamera[]> {
    throw new Error('Method not implemented.');
  }
  async load(condition?: string): Promise<AICameraManageModel[]> {
    let aiopCameras = await this.ai.load(condition);
    // console.log('AIOPCameras', aiopCameras)
    let vehicleCameras = await this.vehicle.load();
    // console.log('VehicleCameras', vehicleCameras)

    let available = aiopCameras.filter(
      (aiopCamera) =>
        !vehicleCameras.some(
          (vehicleCamera) => vehicleCamera.Id == aiopCamera.Id
        )
    );
    let res = this.converter.iterateToModel(available);

    return res;
  }
}

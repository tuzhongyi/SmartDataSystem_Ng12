import { Injectable } from '@angular/core';
import { AICameraManageConverter } from 'src/app/converter/ai-camera-manage.converter';
import { AICamera } from 'src/app/network/model/garbage-station/ai-camera.model';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';
import { AICameraManageModel } from 'src/app/view-model/ai-camera-manage.model';
import { ICameraBusiness } from '../garbage-station-operate.model';
import { GarbageStationOperateAICameraBusiness } from './garbage-station-operate-ai-camera.business';
import { GarbageStationOperateStationCameraBusiness } from './garbage-station-operate-station-camera.business';

@Injectable()
export class GarbageStationOperateCameraBusiness implements ICameraBusiness {
  constructor(
    public ai: GarbageStationOperateAICameraBusiness,
    public station: GarbageStationOperateStationCameraBusiness,
    public converter: AICameraManageConverter
  ) {}
  getData(...args: any): Promise<AICamera[] | Camera[]> {
    throw new Error('Method not implemented.');
  }
  async load(condition?: string): Promise<AICameraManageModel[]> {
    let aiopCameras = await this.ai.load(condition);
    // console.log('AIOPCameras', aiopCameras)
    let stationCameras = await this.station.load();
    // console.log('StationCameras', stationCameras)

    let available = aiopCameras.filter(
      (aiopCamera) =>
        !stationCameras.some(
          (stationCamera) => stationCamera.Id == aiopCamera.Id
        )
    );
    let res = this.converter.iterateToModel(available);

    return res;
  }
}

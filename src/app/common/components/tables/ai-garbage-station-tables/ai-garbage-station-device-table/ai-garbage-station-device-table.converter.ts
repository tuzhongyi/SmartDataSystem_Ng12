import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { AIGarbageCamera } from 'src/app/network/model/ai-garbage/camera.model';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';
import {
  AIGarbageDeviceCamerasState,
  AIGarbageStationDeviceTableItem,
} from './ai-garbage-station-device-table.model';
import { AIGarbageStationDeviceTableService } from './ai-garbage-station-device-table.service';

@Injectable()
export class AIGarbageStationDeviceTableConverter {
  constructor(private service: AIGarbageStationDeviceTableService) {}

  async device(source: AIGarbageDevice) {
    let plain = instanceToPlain(source);
    let model = plainToInstance(AIGarbageStationDeviceTableItem, plain);
    try {
      if (model.Cameras && model.Cameras.length > 0) {
        return model;
      } else if (model.GarbageStationId) {
        let station = await this.service.station.get(model.GarbageStationId);
        if (station.Cameras) {
          model.Cameras = station.Cameras.map((x, index) =>
            this.camera(x, index + 1)
          );
          return model;
        } else {
          return model;
        }
      } else {
        return model;
      }
    } finally {
      model.state.camera = this.camerastate(model.Cameras ?? []);
    }
  }

  camerastate(cameras: AIGarbageCamera[]) {
    let state = AIGarbageDeviceCamerasState.unknown;
    if (cameras.length === 0) {
      return state;
    }
    let online = 0;
    let offline = 0;
    for (let i = 0; i < cameras.length; i++) {
      if (cameras[i].OnlineState === OnlineStatus.Online) {
        online++;
      }
      if (cameras[i].OnlineState === OnlineStatus.Offline) {
        offline++;
      }
    }
    if (online === cameras.length) {
      state = AIGarbageDeviceCamerasState.online;
    } else if (offline === cameras.length) {
      state = AIGarbageDeviceCamerasState.offline;
    } else {
      state = AIGarbageDeviceCamerasState.warn;
    }
    return state;
  }

  camera(source: Camera, index: number) {
    let camera = new AIGarbageCamera();
    camera.CameraId = source.Id;
    camera.Name = source.Name;
    camera.OnlineState = source.OnlineStatus;
    camera.SerialNo = index.toString();
    return camera;
  }
}

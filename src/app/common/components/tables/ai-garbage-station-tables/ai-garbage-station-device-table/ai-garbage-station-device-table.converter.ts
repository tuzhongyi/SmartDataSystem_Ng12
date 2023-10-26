import { Injectable } from '@angular/core';
import { AIGarbageCamera } from 'src/app/network/model/ai-garbage/camera.model';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';
import { Camera } from 'src/app/network/model/camera.model';
import { AIGarbageStationDeviceTableService } from './ai-garbage-station-device-table.service';

@Injectable()
export class AIGarbageStationDeviceTableConverter {
  constructor(private service: AIGarbageStationDeviceTableService) {}

  async device(source: AIGarbageDevice) {
    if (source.Cameras && source.Cameras.length > 0) {
      return source;
    } else if (source.GarbageStationId) {
      let station = await this.service.station.get(source.GarbageStationId);
      if (station.Cameras) {
        source.Cameras = station.Cameras.map((x, index) =>
          this.camera(x, index + 1)
        );
        return source;
      } else {
        return source;
      }
    } else {
      return source;
    }
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

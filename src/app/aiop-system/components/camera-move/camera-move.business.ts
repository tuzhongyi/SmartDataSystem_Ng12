import { Injectable } from '@angular/core';
import { AICamera } from 'src/app/network/model/garbage-station/ai-camera.model';
import { GetCamerasParams } from 'src/app/network/request/ai-camera/ai-camera.params';
import { AICameraRequestService } from 'src/app/network/request/ai-camera/ai-camera.service';

@Injectable()
export class CameraMoveBusiness {
  constructor(private _AICameraRequest: AICameraRequestService) {}

  getAICameras(ids: string[]) {
    let params = new GetCamerasParams();
    params.ResourceIds = ids;
    return this._AICameraRequest.list(params);
  }
  updateCamera(camera: AICamera) {
    return this._AICameraRequest.update(camera);
  }
}

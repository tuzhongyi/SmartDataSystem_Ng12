import { Injectable } from '@angular/core';
import { AICamera } from 'src/app/network/model/garbage-station/ai-camera.model';
import { GetResourceCamerasParams } from 'src/app/network/request/resources/camera/resource-camera.params';
import { ResourceRequestService } from 'src/app/network/request/resources/resource.service';

@Injectable()
export class CameraMoveBusiness {
  constructor(private service: ResourceRequestService) {}

  getAICameras(ids: string[]) {
    let params = new GetResourceCamerasParams();
    params.ResourceIds = ids;
    return this.service.camera.list(params);
  }
  updateCamera(camera: AICamera) {
    return this.service.camera.update(camera);
  }
}

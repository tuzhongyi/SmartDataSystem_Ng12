import { Injectable } from '@angular/core';
import { GetResourceCamerasParams } from 'src/app/network/request/resources/camera/resource-camera.params';
import { ResourceRequestService } from 'src/app/network/request/resources/resource.service';

@Injectable()
export class AICameraModelManageAICameraBusiness {
  constructor(private service: ResourceRequestService) {}

  addAIModel(cameraId: string, modelId: string) {
    return this.service.camera.ai.model.binding(cameraId, modelId);
  }
  getAIModel(cameraId: string, modelId: string) {
    return this.service.camera.ai.model.get(cameraId, modelId);
  }
  deleteAIModel(cameraId: string, modelId: string) {
    return this.service.camera.ai.model.delete(cameraId, modelId);
  }
  list(params: GetResourceCamerasParams = new GetResourceCamerasParams()) {
    return this.service.camera.list(params);
  }
}

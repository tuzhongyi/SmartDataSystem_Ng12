import { Injectable } from '@angular/core';
import { GetCamerasParams } from 'src/app/network/request/ai-camera/ai-camera.params';
import { AICameraRequestService } from 'src/app/network/request/ai-camera/ai-camera.service';

@Injectable()
export class AICameraModelManageAICameraBusiness {
  constructor(private service: AICameraRequestService) {}

  addAIModel(cameraId: string, modelId: string) {
    return this.service.model.add(cameraId, modelId);
  }
  getAIModel(cameraId: string, modelId: string) {
    return this.service.model.get(cameraId, modelId);
  }
  deleteAIModel(cameraId: string, modelId: string) {
    return this.service.model.delete(cameraId, modelId);
  }
  list(params: GetCamerasParams = new GetCamerasParams()) {
    return this.service.list(params);
  }
}

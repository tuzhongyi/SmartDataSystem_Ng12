import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AICamera } from '../../model/garbage-station/ai-camera.model';
import { CameraAIModel } from '../../model/garbage-station/camera-ai.model';
import { ResourceAICamerasUrl } from '../../url/aiop/resources/cameras/cameras.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../base-request-howell.service';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import { GetCamerasParams } from './ai-camera.params';

@Injectable({
  providedIn: 'root',
})
export class AICameraRequestService {
  private basic: HowellBaseRequestService;
  private type: HowellBaseTypeRequestService<AICamera>;

  constructor(http: HowellAuthHttpService, router: Router) {
    this.basic = new HowellBaseRequestService(http, router);
    this.type = this.basic.type(AICamera);
  }

  list(params: GetCamerasParams = new GetCamerasParams()) {
    return this.type.paged(ResourceAICamerasUrl.list(), params);
  }
  create(item: AICamera) {
    return this.type.post(ResourceAICamerasUrl.create(), item);
  }

  get(id: string) {
    return this.type.get(ResourceAICamerasUrl.item(id));
  }

  update(item: AICamera) {
    return this.type.put(ResourceAICamerasUrl.item(item.Id), item);
  }

  delete(id: string) {
    return this.type.delete(ResourceAICamerasUrl.item(id));
  }
  listAIModels(id: string) {
    return this.basic.getArray(
      ResourceAICamerasUrl.AIModels(id),
      CameraAIModel
    );
  }
  addAIModel(cameraId: string, modelId: string) {
    return this.basic.post(
      ResourceAICamerasUrl.singleAIModel(cameraId, modelId),
      CameraAIModel
    );
  }
  getAIModel(cameraId: string, modelId: string) {
    return this.basic.get(
      ResourceAICamerasUrl.singleAIModel(cameraId, modelId),
      CameraAIModel
    );
  }
  deleteAIModel(cameraId: string, modelId: string) {
    return this.basic.delete(
      ResourceAICamerasUrl.singleAIModel(cameraId, modelId),
      CameraAIModel
    );
  }
}

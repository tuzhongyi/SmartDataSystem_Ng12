import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AICamera } from '../../model/garbage-station/ai-camera.model';
import { CameraAIModel } from '../../model/garbage-station/camera-ai.model';
import { PagedList } from '../../model/page_list.model';
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

  async all(params: GetCamerasParams = new GetCamerasParams()) {
    let data: AICamera[] = [];
    let index = 1;
    let paged: PagedList<AICamera>;
    do {
      params.PageIndex = index;
      paged = await this.list(params);
      data = data.concat(paged.Data);
      index++;
    } while (index <= paged.Page.PageCount);
    return data;
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

  private _model?: AICameraAIModelRequestService;
  public get model(): AICameraAIModelRequestService {
    if (!this._model) {
      this._model = new AICameraAIModelRequestService(this.basic);
    }
    return this._model;
  }
}

class AICameraAIModelRequestService {
  constructor(private basic: HowellBaseRequestService) {}
  list(id: string) {
    return this.basic.getArray(
      ResourceAICamerasUrl.AIModels(id),
      CameraAIModel
    );
  }
  add(cameraId: string, modelId: string) {
    return this.basic.post(
      ResourceAICamerasUrl.singleAIModel(cameraId, modelId),
      CameraAIModel
    );
  }
  get(cameraId: string, modelId: string) {
    return this.basic.get(
      ResourceAICamerasUrl.singleAIModel(cameraId, modelId),
      CameraAIModel
    );
  }
  delete(cameraId: string, modelId: string) {
    return this.basic.delete(
      ResourceAICamerasUrl.singleAIModel(cameraId, modelId),
      CameraAIModel
    );
  }
}

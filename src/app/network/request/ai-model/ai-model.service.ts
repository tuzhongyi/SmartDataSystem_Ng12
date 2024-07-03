import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { instanceToPlain } from 'class-transformer';
import { CameraAIModel } from '../../model/garbage-station/camera-ai.model';
import { AIModelsUrl } from '../../url/aiop/ai-models/ai-models.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../base-request-howell.service';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import { GetAIModelsParams } from './ai-model.params';

@Injectable({
  providedIn: 'root',
})
export class AIModelRequestService {
  private basic: HowellBaseRequestService;
  private type: HowellBaseTypeRequestService<CameraAIModel>;

  constructor(http: HowellAuthHttpService, router: Router) {
    this.basic = new HowellBaseRequestService(http, router);
    this.type = this.basic.type(CameraAIModel);
  }
  list(params: GetAIModelsParams = new GetAIModelsParams()) {
    return this.type.paged(AIModelsUrl.list(), params);
  }

  create(item: CameraAIModel) {
    return this.type.post(AIModelsUrl.create(), item);
  }

  get(id: string): Promise<CameraAIModel> {
    return this.type.get(AIModelsUrl.item(id));
  }

  update(item: CameraAIModel) {
    let url = AIModelsUrl.item(item.Id);
    let plain: any = instanceToPlain(item);
    return this.type.put(url, plain);
  }

  delete(id: string) {
    return this.type.delete(AIModelsUrl.item(id));
  }

  parse(base64JSONData: string): Promise<CameraAIModel> {
    return this.basic.poststring(
      AIModelsUrl.parse(),
      CameraAIModel,
      base64JSONData
    );
  }
}

import { Injectable } from '@angular/core';
import { CameraAIModel } from '../../model/camera-ai.model';
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

  constructor(_http: HowellAuthHttpService) {
    this.basic = new HowellBaseRequestService(_http);
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
    return this.type.put(AIModelsUrl.item(item.Id), item);
  }

  delete(id: string) {
    return this.type.delete(AIModelsUrl.item(id));
  }

  parse(base64JSONData: string) {
    return this.basic.poststring(
      AIModelsUrl.parse(),
      CameraAIModel,
      base64JSONData
    );
  }
}

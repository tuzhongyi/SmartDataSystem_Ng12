import { Injectable } from "@angular/core";
import { CameraAIModel } from "../../model/camera-ai.model";
import { AIModelsUrl } from "../../url/aiop/ai-models/ai-models.url";
import { CameraAIUrl } from "../../url/aiop/events/records/camera-ai/camera-ai.url";
import { BaseRequestService, BaseTypeRequestService } from "../base-request.service";
import { HowellAuthHttpService } from "../howell-auth-http.service";
import { GetAIModelsParams } from "./ai-model.params";

@Injectable({
  providedIn: "root",
})
export class AIModelRequestService {
  private basic: BaseRequestService;
  private type: BaseTypeRequestService<CameraAIModel>;


  constructor(_http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(_http);
    this.type = this.basic.type(CameraAIModel);
  }

  create(item: CameraAIModel) {
    return this.type.post(AIModelsUrl.create(), item)
  }

  list(params: GetAIModelsParams = new GetAIModelsParams()) {
    return this.type.paged(AIModelsUrl.list(), params);
  }

  get(id: string): Promise<CameraAIModel> {
    return this.type.get(AIModelsUrl.item(id));
  }

  set(item: CameraAIModel) {
    return this.type.put(AIModelsUrl.item(item.Id), item)
  }

  delete(id: string) {
    return this.type.delete(AIModelsUrl.item(id))
  }


  parse(base64JSONData: string) {
    return this.basic.poststring(AIModelsUrl.parse(), CameraAIModel, base64JSONData)
  }

}

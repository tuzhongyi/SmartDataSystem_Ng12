import { Injectable } from "@angular/core";
import { AICamera } from "../../model/ai-camera.model";
import { CameraAIModel } from "../../model/camera-ai.model";
import { AICamerasUrl } from "../../url/aiop/resources/cameras/cameras.url";
import { BaseRequestService, BaseTypeRequestService } from "../base-request.service";
import { HowellAuthHttpService } from "../howell-auth-http.service";
import { GetCamerasParams } from "./ai-camera.params";

@Injectable({
  providedIn: "root",
})
export class AICameraRequestService {

  private basic: BaseRequestService;
  private type: BaseTypeRequestService<AICamera>;

  constructor(_http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(_http);
    this.type = this.basic.type(AICamera);
  }

  create(item: AICamera) {
    return this.type.post(AICamerasUrl.create(), item)
  }

  get(id: string) {
    return this.type.get(AICamerasUrl.item(id));
  }


  set(item: AICamera) {
    return this.type.put(AICamerasUrl.item(item.Id), item)
  }

  delete(id: string) {
    return this.type.delete(AICamerasUrl.item(id))
  }

  list(params: GetCamerasParams = new GetCamerasParams()) {
    return this.type.paged(AICamerasUrl.list(), params);
  }
  listAIModels(id: string) {
    return this.basic.get(AICamerasUrl.AIModels(id), CameraAIModel)
  }
  addAIModel(cameraId: string, modelId: string) {
    return this.basic.post(AICamerasUrl.singleAIModel(cameraId, modelId), CameraAIModel)
  }
  getAIModel(cameraId: string, modelId: string) {
    return this.basic.get(AICamerasUrl.singleAIModel(cameraId, modelId), CameraAIModel)
  }
  deleteAIModel(cameraId: string, modelId: string) {
    return this.basic.delete(AICamerasUrl.singleAIModel(cameraId, modelId), CameraAIModel)
  }

}

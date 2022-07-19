import { Injectable } from "@angular/core";
import { CameraAIModel } from "src/app/network/model/camera-ai.model";
import { AIModelRequestService } from "src/app/network/request/ai-model/ai-model.service";

@Injectable()
export class AIModelOperateBusiness {
  constructor(private _cameraAIModelRequest: AIModelRequestService) {

  }
  getAIModel(id: string) {
    return this._cameraAIModelRequest.get(id)
  }
  parseAIModel(base64JSONData: string) {
    return this._cameraAIModelRequest.parse(base64JSONData)
  }
  updateAIModel(model: CameraAIModel) {
    return this._cameraAIModelRequest.update(model)
  }
  createAIModel(model: CameraAIModel) {
    return this._cameraAIModelRequest.create(model)
  }

}
import { Injectable } from "@angular/core";
import { CameraAIModel } from "src/app/network/model/camera-ai.model";
import { CameraAIModelRequestService } from "src/app/network/request/camera-ai-model/camera-ai-model.service";

@Injectable()
export class AiModelOperateBusiness {
  constructor(private _cameraAIModelRequest: CameraAIModelRequestService) {

  }
  getAIModel(id: string) {
    return this._cameraAIModelRequest.get(id)
  }
  parseAIModel(base64JSONData: string) {
    return this._cameraAIModelRequest.parse(base64JSONData)
  }
  setAIModel(model: CameraAIModel) {
    return this._cameraAIModelRequest.set(model)
  }
  createAIModel(model: CameraAIModel) {
    return this._cameraAIModelRequest.create(model)
  }

}
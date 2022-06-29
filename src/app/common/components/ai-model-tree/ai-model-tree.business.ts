import { Injectable } from "@angular/core";
import { CameraAIModelRequestService } from "src/app/network/request/camera-ai-model/camera-ai-model.service";

@Injectable()
export class AIModelTreeBusiness {
  constructor(private _cameraAIModelRequest: CameraAIModelRequestService) {

  }

}
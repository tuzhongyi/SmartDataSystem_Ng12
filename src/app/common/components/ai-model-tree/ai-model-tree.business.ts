import { Injectable } from "@angular/core";
import { AIModelRequestService } from "src/app/network/request/ai-model/ai-model.service";

@Injectable()
export class AIModelTreeBusiness {
  constructor(private _cameraAIModelRequest: AIModelRequestService) {

  }

}
import { Injectable } from "@angular/core";
import { CameraAIEventRequestService } from "src/app/network/request/camera-ai-event/camera-ai-event.service";

@Injectable()
export class AiCameraEventsBusiness {
  constructor(private _cameraAIEventRequest: CameraAIEventRequestService) {

  }
  init() {
    return this._loadData();
  }
  private _loadData() {
    return this._cameraAIEventRequest.list();
  }
}
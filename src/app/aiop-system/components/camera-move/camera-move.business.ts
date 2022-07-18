import { Injectable } from "@angular/core";
import { AICamera } from "src/app/network/model/ai-camera.model";
import { Resource } from "src/app/network/model/resource.model";
import { GetCamerasParams } from "src/app/network/request/ai-camera/ai-camera.params";
import { AICameraRequestService } from "src/app/network/request/ai-camera/ai-camera.service";
import { ResourceRequestService } from "src/app/network/request/resources/resource.service";
import { GetResourcesParams } from "src/app/network/request/resources/resources-params";

@Injectable()
export class CameraMoveBusiness {
  constructor(private _AICameraRequest: AICameraRequestService) { }


  getAICameras(ids: string[]) {
    let params = new GetCamerasParams();
    params.ResourceIds = ids;
    return this._AICameraRequest.list(params)
  }
  updateCamera(camera: AICamera) {
    return this._AICameraRequest.update(camera)
  }
}
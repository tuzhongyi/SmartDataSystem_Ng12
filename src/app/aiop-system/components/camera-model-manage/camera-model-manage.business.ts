import { Injectable } from "@angular/core";
import { GetCamerasParams } from "src/app/network/request/ai-camera/ai-camera.params";
import { AICameraRequestService } from "src/app/network/request/ai-camera/ai-camera.service";
import { AIModelRequestService } from "src/app/network/request/ai-model/ai-model.service";
import { LabelRequestService } from "src/app/network/request/label/label.service";

@Injectable()
export class CameraModelManageBusiness {
  constructor(private _cameraRequest: AICameraRequestService, private _AIModelRequest: AIModelRequestService, private _labelRequest: LabelRequestService) {

  }
  async init(condition: string = '', pageIndex: number = 1, pageSize: number = 9) {
    let params = new GetCamerasParams();
    params.PageIndex = pageIndex;
    params.PageSize = pageSize;
    params.Name = condition;
    let cameras = await this._listCameras(params);
    console.log(cameras)


    let models = await this._cameraRequest.AIModels("f3f64972aa894731b90e6293234c0bbb")
    console.log(models)

  }
  listAIModels() {
    return this._AIModelRequest.list()
  }
  listLabels() {
    return this._labelRequest.list()
  }
  private _listCameras(params: GetCamerasParams = new GetCamerasParams()) {
    return this._cameraRequest.list(params)

  }

}
import { Injectable } from "@angular/core";
import { AICameraModelManageConverter } from "src/app/converter/ai-camera-model-manage.converter";
import { AIModelManageConverter } from "src/app/converter/ai-model-manage.converter";
import { PagedList } from "src/app/network/model/page_list.model";
import { GetCamerasParams } from "src/app/network/request/ai-camera/ai-camera.params";
import { AICameraRequestService } from "src/app/network/request/ai-camera/ai-camera.service";
import { GetAIModelsParams } from "src/app/network/request/ai-model/ai-model.params";
import { AIModelRequestService } from "src/app/network/request/ai-model/ai-model.service";
import { LabelRequestService } from "src/app/network/request/label/label.service";
import { AICameraModelManageModel } from "src/app/view-model/ai-camera-model-manage.model";

@Injectable()
export class AICameraModelManageBusiness {
  constructor(private _cameraRequest: AICameraRequestService, private _AIModelRequest: AIModelRequestService, private _labelRequest: LabelRequestService, private _converter: AICameraModelManageConverter, private _AIModelManageConverter: AIModelManageConverter) {

  }
  async listCameraAIModels(condition: string = '', pageIndex: number = 1, pageSize: number = 9) {
    let params = new GetCamerasParams();
    params.PageIndex = pageIndex;
    params.PageSize = pageSize;
    params.Name = condition;
    let tmp = await this._listCameras(params);

    let data = this._converter.iterateToModel(tmp.Data);

    for (let i = 0; i < data.length; i++) {
      let model = data[i];
      let aiModels = await this._cameraRequest.listAIModels(model.CameraId)
      model.AIModels = this._AIModelManageConverter.iterateToModel(aiModels)

    }

    let res: PagedList<AICameraModelManageModel> = {
      Page: tmp.Page,
      Data: data,
    };
    return res;

  }
  listAIModels(condition: string) {
    let params: GetAIModelsParams = new GetAIModelsParams();
    params.ModelName = condition;
    return this._AIModelRequest.list(params)
  }
  listLabels() {
    return this._labelRequest.list()
  }

  addAIModelToCamera(cameraId: string, modelId: string) {
    return this._cameraRequest.addAIModel(cameraId, modelId);
  }
  getAIModelFromCamera(cameraId: string, modelId: string) {
    return this._cameraRequest.getAIModel(cameraId, modelId)
  }
  deleteAIModelFromCamera(cameraId: string, modelId: string) {
    return this._cameraRequest.deleteAIModel(cameraId, modelId)
  }
  private _listCameras(params: GetCamerasParams = new GetCamerasParams()) {
    return this._cameraRequest.list(params)

  }

  //"a442c3c007264eedbace2d21fc0ffc26" CameriD

  // "0cc97f256ad347378a88b1fc806b53be" test

}
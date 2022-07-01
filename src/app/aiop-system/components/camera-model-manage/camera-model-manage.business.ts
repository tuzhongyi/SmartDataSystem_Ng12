import { Injectable } from "@angular/core";
import { AICameraModelManageConverter } from "src/app/converter/ai-camera-model-manage.converter";
import { AIModelManageConverter } from "src/app/converter/ai-model-manage.converter";
import { PagedList } from "src/app/network/model/page_list.model";
import { GetCamerasParams } from "src/app/network/request/ai-camera/ai-camera.params";
import { AICameraRequestService } from "src/app/network/request/ai-camera/ai-camera.service";
import { AIModelRequestService } from "src/app/network/request/ai-model/ai-model.service";
import { LabelRequestService } from "src/app/network/request/label/label.service";
import { AICameraModelManageModel } from "src/app/view-model/ai-camera-model-manage.model";

@Injectable()
export class AICameraModelManageBusiness {
  constructor(private _cameraRequest: AICameraRequestService, private _AIModelRequest: AIModelRequestService, private _labelRequest: LabelRequestService, private _converter: AICameraModelManageConverter, private _AIModelManageConverter: AIModelManageConverter) {

  }
  async init(condition: string = '', pageIndex: number = 1, pageSize: number = 9) {
    let params = new GetCamerasParams();
    params.PageIndex = pageIndex;
    params.PageSize = pageSize;
    params.Name = condition;
    let tmp = await this._listCameras(params);

    let data = this._converter.iterateToModel(tmp.Data);

    for (let i = 0; i < data.length; i++) {
      let model = data[i];
      let aiModels = await this._cameraRequest.AIModels(model.CameraId)
      model.AIModels = this._AIModelManageConverter.iterateToModel(aiModels)

    }
    console.log(data)

    let res: PagedList<AICameraModelManageModel> = {
      Page: tmp.Page,
      Data: data,
    };
    return res;

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
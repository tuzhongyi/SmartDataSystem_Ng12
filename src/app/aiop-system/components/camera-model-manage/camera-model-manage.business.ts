import { Injectable } from '@angular/core';
import { AICameraModelManageConverter } from 'src/app/aiop-system/components/camera-model-manage/camera-model-manage.converter';
import { AIModelManageConverter } from 'src/app/aiop-system/components/ai-model-manage/ai-model-manage.converter';
import { AIModelTransformType } from 'src/app/enum/transform-type.enum';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetCamerasParams } from 'src/app/network/request/ai-camera/ai-camera.params';
import { AICameraRequestService } from 'src/app/network/request/ai-camera/ai-camera.service';
import { GetAIModelsParams } from 'src/app/network/request/ai-model/ai-model.params';
import { AIModelRequestService } from 'src/app/network/request/ai-model/ai-model.service';
import { LabelRequestService } from 'src/app/network/request/label/label.service';
import {
  AICameraModelManageModel,
  AICameraModelManageSearchInfo,
} from 'src/app/aiop-system/components/camera-model-manage/camera-model-manage.model';

@Injectable()
export class AICameraModelManageBusiness {
  constructor(
    private _cameraRequest: AICameraRequestService,
    private _AIModelRequest: AIModelRequestService,
    private _labelRequest: LabelRequestService,
    private _converter: AICameraModelManageConverter,
    private _AIModelManageConverter: AIModelManageConverter
  ) {}
  async listCameraAIModels(searchInfo: AICameraModelManageSearchInfo) {
    let params = new GetCamerasParams();
    if (searchInfo.PageIndex) params.PageIndex = searchInfo.PageIndex;
    if (searchInfo.PageSize) params.PageSize = searchInfo.PageSize;
    if (searchInfo.CameraName) params.Name = searchInfo.CameraName;
    params.LabelIds = searchInfo.LabelIds;

    let tmp = await this._listCameras(params);
    console.log(tmp);
    let data = this._converter.iterateToModel(tmp.Data);

    for (let i = 0; i < data.length; i++) {
      let model = data[i];
      let aiModels = await this._cameraRequest.listAIModels(model.Id);
      model.AIModels = this._AIModelManageConverter.iterateToModel(aiModels);
    }

    let res: PagedList<AICameraModelManageModel> = {
      Page: tmp.Page,
      Data: data,
    };
    return res;
  }
  listAIModels(searchInfo: AICameraModelManageSearchInfo) {
    let params: GetAIModelsParams = new GetAIModelsParams();
    if (searchInfo.ModelName) params.ModelName = searchInfo.ModelName;
    if (searchInfo.TransformType)
      params.TransformType = searchInfo.TransformType;

    return this._AIModelRequest.list(params);
  }
  listLabels() {
    return this._labelRequest.list();
  }

  addAIModelToCamera(cameraId: string, modelId: string) {
    return this._cameraRequest.addAIModel(cameraId, modelId);
  }
  getAIModelFromCamera(cameraId: string, modelId: string) {
    return this._cameraRequest.getAIModel(cameraId, modelId);
  }
  deleteAIModelFromCamera(cameraId: string, modelId: string) {
    return this._cameraRequest.deleteAIModel(cameraId, modelId);
  }
  private _listCameras(params: GetCamerasParams = new GetCamerasParams()) {
    return this._cameraRequest.list(params);
  }

  //"a442c3c007264eedbace2d21fc0ffc26" CameriD

  // "0cc97f256ad347378a88b1fc806b53be" test
}

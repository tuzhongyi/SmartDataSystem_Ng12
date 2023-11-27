import { Injectable } from '@angular/core';
import { AICameraModelManageConverter } from 'src/app/aiop-system/components/camera-model-manage/camera-model-manage.converter';
import {
  AICameraModelManageSearchInfo,
  CameraAIModelManageModel,
  CameraManageModel,
} from 'src/app/aiop-system/components/camera-model-manage/camera-model-manage.model';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { AICamera } from 'src/app/network/model/garbage-station/ai-camera.model';
import { CameraAIModel } from 'src/app/network/model/garbage-station/camera-ai.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetAIModelsParams } from 'src/app/network/request/ai-model/ai-model.params';
import { AIModelRequestService } from 'src/app/network/request/ai-model/ai-model.service';
import { GetResourceCamerasParams } from 'src/app/network/request/resources/camera/resource-camera.params';
import { ResourceRequestService } from 'src/app/network/request/resources/resource.service';

@Injectable()
export class AICameraModelManageBusiness {
  private _aiModelMap = new Map<string, CameraAIModel>();
  constructor(
    private _AIModelRequest: AIModelRequestService,
    private service: ResourceRequestService,
    private _converter: AICameraModelManageConverter
  ) {}
  async listCameraAIModels(searchInfo: AICameraModelManageSearchInfo) {
    let params = new GetResourceCamerasParams();
    if (searchInfo.PageIndex) params.PageIndex = searchInfo.PageIndex;
    if (searchInfo.PageSize) params.PageSize = searchInfo.PageSize;
    if (searchInfo.CameraName) params.Name = searchInfo.CameraName;
    params.LabelIds = searchInfo.LabelIds;
    if (searchInfo.CameraDeviceType)
      params.DeviceType = searchInfo.CameraDeviceType;

    let { Page, Data } = await this._listCameras(params);
    let models =
      this._converter.iterateToModel<CameraManageModel<AICamera>>(Data);

    for (let i = 0; i < models.length; i++) {
      let model = models[i];
      let aiModels = await this.service.camera.ai.model.array(model.Id);
      model.AIModels =
        this._converter.iterateToModel<CameraAIModelManageModel<CameraAIModel>>(
          aiModels
        );
    }
    models.sort((a, b) => {
      return LocaleCompare.compare(a.Name, b.Name);
    });

    let res: PagedList<CameraManageModel> = {
      Page: Page,
      Data: models,
    };
    return res;
  }
  async listAIModels(searchInfo: AICameraModelManageSearchInfo) {
    let params: GetAIModelsParams = new GetAIModelsParams();
    if (searchInfo.ModelName) params.ModelName = searchInfo.ModelName;
    if (searchInfo.CameraDeviceType)
      params.TransformType = searchInfo.CameraDeviceType;

    let { Data } = await this._AIModelRequest.list(params);

    Data.forEach(this._register.bind(this));

    // console.log(this._aiModelMap);
    let models =
      this._converter.iterateToModel<CameraAIModelManageModel<CameraAIModel>>(
        Data
      );
    models.sort((a, b) => {
      return LocaleCompare.compare(a.Name, b.Name);
    });

    return models;
  }
  listLabels() {
    return this.service.label.list();
  }

  addAIModelToCamera(cameraId: string, modelId: string) {
    return this.service.camera.ai.model.binding(cameraId, modelId);
  }
  getAIModelFromCamera(cameraId: string, modelId: string) {
    return this.service.camera.ai.model.get(cameraId, modelId);
  }
  deleteAIModelFromCamera(cameraId: string, modelId: string) {
    return this.service.camera.ai.model.delete(cameraId, modelId);
  }
  private _listCameras(
    params: GetResourceCamerasParams = new GetResourceCamerasParams()
  ) {
    return this.service.camera.list(params);
  }
  private _register(model: CameraAIModel) {
    if (!this._aiModelMap.has(model.Id)) {
      this._aiModelMap.set(model.Id, model);
    }
  }
}

import { instanceToPlain } from 'class-transformer';
import { BatchResult } from 'src/app/network/model/garbage-station/batch-result.model';
import { CameraAIModel } from 'src/app/network/model/garbage-station/camera-ai.model';
import { ResourcesUrl } from 'src/app/network/url/aiop/resources/resources.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../../base-request-howell.service';
import { BatchCopyRequest } from './resource-camera-ai-model.param';

export class ResourceCameraAIModelService {
  type: HowellBaseTypeRequestService<CameraAIModel>;
  constructor(private basic: HowellBaseRequestService) {
    this.type = basic.type(CameraAIModel);
  }

  array(cameraId: string) {
    let url = ResourcesUrl.camera().aiModel(cameraId).basic();
    return this.type.getArray(url);
  }
  get(cameraId: string, modelId: string) {
    let url = ResourcesUrl.camera().aiModel(cameraId).item(modelId);
    return this.type.get(url);
  }
  binding(cameraId: string, modelId: string) {
    let url = ResourcesUrl.camera().aiModel(cameraId).item(modelId);
    return this.type.post(url);
  }
  delete(cameraId: string, modelId: string) {
    let url = ResourcesUrl.camera().aiModel(cameraId).item(modelId);
    return this.type.delete(url);
  }
  copyTo(cameraId: string, request: BatchCopyRequest) {
    let plain = instanceToPlain(request);
    let url = ResourcesUrl.camera().aiModel(cameraId).copyTo();
    return this.basic.post(url, BatchResult, plain);
  }
}

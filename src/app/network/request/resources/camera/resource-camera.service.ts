import { instanceToPlain } from 'class-transformer';
import { AICamera } from 'src/app/network/model/garbage-station/ai-camera.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { ResourcesUrl } from 'src/app/network/url/aiop/resources/resources.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../base-request-howell.service';
import { ResourceCameraAICountService } from './ai-count/resource-camera-ai-count.service';
import { ResourceCameraAIModelService } from './ai-model/resource-camera-ai-model.service';
import { GetResourceCamerasParams } from './resource-camera.params';

export class ResourceCameraService {
  private type: HowellBaseTypeRequestService<AICamera>;

  constructor(private basic: HowellBaseRequestService) {
    this.type = this.basic.type(AICamera);
  }

  async all(params: GetResourceCamerasParams = new GetResourceCamerasParams()) {
    let data: AICamera[] = [];
    let index = 1;
    let paged: PagedList<AICamera>;
    do {
      params.PageIndex = index;
      paged = await this.list(params);
      data = data.concat(paged.Data);
      index++;
    } while (index <= paged.Page.PageCount);
    return data;
  }

  list(params: GetResourceCamerasParams = new GetResourceCamerasParams()) {
    let plain = instanceToPlain(params);
    let url = ResourcesUrl.camera().list();
    return this.type.paged(url, plain);
  }
  create(item: AICamera) {
    let plain = instanceToPlain(item);
    let url = ResourcesUrl.camera().basic();
    return this.type.post(url, plain);
  }

  get(id: string) {
    let url = ResourcesUrl.camera().item(id);
    return this.type.get(url);
  }

  update(item: AICamera) {
    let plain = instanceToPlain(item);
    let url = ResourcesUrl.camera().item(item.Id);
    return this.type.put(url, plain as AICamera);
  }

  delete(id: string) {
    let url = ResourcesUrl.camera().item(id);
    return this.type.delete(url);
  }
  private _ai?: ResourceCameraAIService;
  public get ai(): ResourceCameraAIService {
    if (!this._ai) {
      this._ai = new ResourceCameraAIService(this.basic);
    }
    return this._ai;
  }
}

class ResourceCameraAIService {
  constructor(private basic: HowellBaseRequestService) {}
  private _model?: ResourceCameraAIModelService;
  public get model(): ResourceCameraAIModelService {
    if (!this._model) {
      this._model = new ResourceCameraAIModelService(this.basic);
    }
    return this._model;
  }

  private _count?: ResourceCameraAICountService;
  public get count(): ResourceCameraAICountService {
    if (!this._count) {
      this._count = new ResourceCameraAICountService(this.basic);
    }
    return this._count;
  }
}

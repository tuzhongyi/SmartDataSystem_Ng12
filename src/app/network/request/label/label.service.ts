import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceLabel } from '../../model/garbage-station/resource-label.model';
import { ResourceLabelsUrl } from '../../url/aiop/resources/labels/labels.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../base-request-howell.service';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import { BatchRequest } from '../resources/resources-params';
import { GetResourceLabelsParams } from './label.params';

@Injectable({
  providedIn: 'root',
})
export class LabelRequestService {
  private basic: HowellBaseRequestService;
  private type: HowellBaseTypeRequestService<ResourceLabel>;

  constructor(http: HowellAuthHttpService, router: Router) {
    this.basic = new HowellBaseRequestService(http, router);
    this.type = this.basic.type(ResourceLabel);
  }

  create(item: ResourceLabel) {
    return this.type.post(ResourceLabelsUrl.base(), item);
  }

  get(id: string) {
    return this.type.get(ResourceLabelsUrl.item(id));
  }

  update(item: ResourceLabel) {
    return this.type.put(ResourceLabelsUrl.item(item.Id), item);
  }

  delete(id: string) {
    return this.type.delete(ResourceLabelsUrl.item(id));
  }

  list(params: GetResourceLabelsParams = new GetResourceLabelsParams()) {
    return this.type.paged(ResourceLabelsUrl.list(), params);
  }

  // 将当前Label添加到一组 Resource中
  batch(id: string, params: BatchRequest) {
    return this.type.post(ResourceLabelsUrl.batch(id), params);
  }
}

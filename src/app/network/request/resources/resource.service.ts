import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractService } from 'src/app/business/Ibusiness';
import {
  ICreate,
  IDelete,
  IUpdate,
} from 'src/app/common/interfaces/bussiness.interface';
import { CameraDeviceType } from 'src/app/enum/camera-device-type.enum';
import { ResourceLabel } from '../../model/garbage-station/resource-label.model';
import { Resource } from '../../model/garbage-station/resource.model';
import { PagedList } from '../../model/page_list.model';
import { ResourceLabelsUrl } from '../../url/aiop/resources/labels/labels.url';
import { ResourcesURL } from '../../url/aiop/resources/resources.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../base-request-howell.service';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import { GetResourceLabelsParams } from '../label/label.params';
import { GetResourcesParams } from './resources-params';

@Injectable({
  providedIn: 'root',
})
export class ResourceRequestService {
  private basic: HowellBaseRequestService;
  private type: HowellBaseTypeRequestService<Resource>;

  constructor(http: HowellAuthHttpService, router: Router) {
    this.basic = new HowellBaseRequestService(http, router);
    this.type = this.basic.type(Resource);
  }
  create(item: Resource) {
    return this.type.post(ResourcesURL.base(), item);
  }

  get(id: string) {
    return this.type.get(ResourcesURL.item(id));
  }

  update(item: Resource) {
    return this.type.put(ResourcesURL.item(item.Id), item);
  }
  del(id: string) {
    return this.type.delete(ResourcesURL.item(id));
  }

  list(params: GetResourcesParams) {
    return this.type.paged(ResourcesURL.list(), params);
  }

  deviceTypes(): Promise<CameraDeviceType[]> {
    let url = ResourcesURL.deviceTypes();
    return this.basic.http.get<CameraDeviceType[]>(url).toPromise();
  }

  private _label?: ResourceLabelRequestService;
  public get label(): ResourceLabelRequestService {
    if (!this._label) {
      this._label = new ResourceLabelRequestService(this.basic);
    }
    return this._label;
  }
}

class ResourceLabelRequestService
  extends AbstractService<ResourceLabel>
  implements
    ICreate<ResourceLabel>,
    IUpdate<ResourceLabel>,
    IDelete<ResourceLabel>
{
  private type: HowellBaseTypeRequestService<ResourceLabel>;
  constructor(private basic: HowellBaseRequestService) {
    super();
    this.type = basic.type(ResourceLabel);
  }
  create(data?: ResourceLabel | string, resourceId?: string) {
    let url;
    if (typeof data === 'string') {
      url = ResourceLabelsUrl.item(data, resourceId);
      return this.type.post(url);
    } else {
      url = ResourceLabelsUrl.base(resourceId);
      return this.type.post(url, data);
    }
  }

  get(id: string, resourceId?: string): Promise<ResourceLabel> {
    let url = ResourceLabelsUrl.item(id, resourceId);
    return this.type.get(url);
  }
  update(data: ResourceLabel, resourceId?: string): Promise<ResourceLabel> {
    let url = ResourceLabelsUrl.item(data.Id, resourceId);
    return this.type.put(url, data);
  }
  delete(id: string, resourceId?: string): Promise<ResourceLabel> {
    let url = ResourceLabelsUrl.item(id, resourceId);
    return this.type.delete(url);
  }

  list(
    params: GetResourceLabelsParams = new GetResourceLabelsParams()
  ): Promise<PagedList<ResourceLabel>> {
    let url = ResourceLabelsUrl.list();
    return this.type.paged(url, params);
  }

  array(resourceId: string) {
    let url = ResourceLabelsUrl.labels(resourceId);
    return this.type.getArray(url);
  }
}

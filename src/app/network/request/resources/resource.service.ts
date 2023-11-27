import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { instanceToPlain } from 'class-transformer';
import { Resource } from '../../model/garbage-station/resource.model';
import { ResourcesUrl } from '../../url/aiop/resources/resources.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../base-request-howell.service';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import { ResourceCameraService } from './camera/resource-camera.service';
import { ResourceCrossingService } from './crossing/resource-crossing.service';
import { ResourceEncodeDeviceService } from './encode-device/resource-encode-device.service';
import { ResourceLabelRequestService } from './label/resource-label.service';
import { GetResourcesParams } from './resources-params';
import { ResourceStatusService } from './status/resource-status.service';

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
    let plain = instanceToPlain(item);
    return this.type.post(ResourcesUrl.base(), plain);
  }

  get(id: string) {
    return this.type.get(ResourcesUrl.item(id));
  }

  update(item: Resource) {
    let plain = instanceToPlain(item);
    return this.type.put(ResourcesUrl.item(item.Id), plain as Resource);
  }
  delete(id: string) {
    return this.type.delete(ResourcesUrl.item(id));
  }

  list(params: GetResourcesParams) {
    let plain = instanceToPlain(params);
    return this.type.paged(ResourcesUrl.list(), plain);
  }
  deviceTypes(): Promise<string[]> {
    let url = ResourcesUrl.deviceTypes();
    return this.basic.http.get<string[]>(url).toPromise();
  }

  private _label?: ResourceLabelRequestService;
  public get label(): ResourceLabelRequestService {
    if (!this._label) {
      this._label = new ResourceLabelRequestService(this.basic);
    }
    return this._label;
  }

  private _encodeDevice?: ResourceEncodeDeviceService;
  public get encodeDevice(): ResourceEncodeDeviceService {
    if (!this._encodeDevice) {
      this._encodeDevice = new ResourceEncodeDeviceService(this.basic);
    }
    return this._encodeDevice;
  }

  private _camera?: ResourceCameraService;
  public get camera(): ResourceCameraService {
    if (!this._camera) {
      this._camera = new ResourceCameraService(this.basic);
    }
    return this._camera;
  }

  private _status?: ResourceStatusService;
  public get status(): ResourceStatusService {
    if (!this._status) {
      this._status = new ResourceStatusService(this.basic);
    }
    return this._status;
  }

  private _crossing?: ResourceCrossingService;
  public get crossing(): ResourceCrossingService {
    if (!this._crossing) {
      this._crossing = new ResourceCrossingService(this.basic);
    }
    return this._crossing;
  }
}

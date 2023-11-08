import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EncodeDevice } from '../../model/garbage-station/encode-device';
import { Protocol } from '../../model/garbage-station/protocol.model';
import { PagedList } from '../../model/page_list.model';
import { ResourceEncodeDevicesUrl } from '../../url/aiop/resources/encode-devices/encode-devices.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../base-request-howell.service';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import { GetEncodeDevicesParams } from './encode-devices-params';

@Injectable({
  providedIn: 'root',
})
export class EncodeDeviceRequestService {
  private basic: HowellBaseRequestService;
  private type: HowellBaseTypeRequestService<EncodeDevice>;

  constructor(http: HowellAuthHttpService, router: Router) {
    this.basic = new HowellBaseRequestService(http, router);
    this.type = this.basic.type(EncodeDevice);
  }
  create(item: EncodeDevice) {
    return this.type.post(ResourceEncodeDevicesUrl.create(), item);
  }

  get(id: string): Promise<EncodeDevice> {
    return this.type.get(ResourceEncodeDevicesUrl.item(id));
  }

  update(item: EncodeDevice) {
    return this.type.put(ResourceEncodeDevicesUrl.item(item.Id), item);
  }

  delete(id: string) {
    return this.type.delete(ResourceEncodeDevicesUrl.item(id));
  }

  list(params: GetEncodeDevicesParams = new GetEncodeDevicesParams()) {
    return this.type.paged(ResourceEncodeDevicesUrl.list(), params);
  }

  async all(params: GetEncodeDevicesParams = new GetEncodeDevicesParams()) {
    let data: EncodeDevice[] = [];
    let index = 1;
    let paged: PagedList<EncodeDevice>;
    do {
      params.PageIndex = index;
      paged = await this.list(params);
      data = data.concat(paged.Data);
      index++;
    } while (index <= paged.Page.PageCount);
    return data;
  }

  protocol() {
    return this.basic.getArray(ResourceEncodeDevicesUrl.protocols(), Protocol);
  }
}

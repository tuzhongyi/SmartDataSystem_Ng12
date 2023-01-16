import { Injectable } from '@angular/core';
import { EncodeDevice } from '../../model/encode-device';
import { Protocol } from '../../model/protocol.model';
import { ResourceEncodeDevicesUrl } from '../../url/aiop/resources/encode-devices/encode-devices.url';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../base-request.service';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import { GetEncodeDevicesParams } from './encode-devices-params';

@Injectable({
  providedIn: 'root',
})
export class EncodeDeviceRequestService {
  private basic: BaseRequestService;
  private type: BaseTypeRequestService<EncodeDevice>;

  constructor(_http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(_http);
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

  protocol() {
    return this.basic.getArray(ResourceEncodeDevicesUrl.protocols(), Protocol);
  }
}

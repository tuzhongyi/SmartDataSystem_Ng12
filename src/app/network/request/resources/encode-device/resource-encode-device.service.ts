import { instanceToPlain } from 'class-transformer';
import { EncodeDevice } from 'src/app/network/model/garbage-station/encode-device';
import { Protocol } from 'src/app/network/model/garbage-station/protocol.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { ResourcesUrl } from 'src/app/network/url/aiop/resources/resources.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../base-request-howell.service';
import { GetResourceEncodeDevicesParams } from './resource-encode-device.params';

export class ResourceEncodeDeviceService {
  constructor(private basic: HowellBaseRequestService) {
    this.type = basic.type(EncodeDevice);
  }
  private type: HowellBaseTypeRequestService<EncodeDevice>;

  async all(
    params: GetResourceEncodeDevicesParams = new GetResourceEncodeDevicesParams()
  ) {
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

  create(data: EncodeDevice) {
    let plain = instanceToPlain(data);
    let url = ResourcesUrl.encodeDevice().basic();
    return this.type.post(url, plain);
  }
  get(id: string) {
    let url = ResourcesUrl.encodeDevice().item(id);
    return this.type.get(url);
  }
  update(data: EncodeDevice) {
    let plain = instanceToPlain(data);
    let url = ResourcesUrl.encodeDevice().item(data.Id);
    return this.type.put(url, plain as EncodeDevice);
  }
  delete(id: string) {
    let url = ResourcesUrl.encodeDevice().item(id);
    return this.type.delete(url);
  }
  list(
    params: GetResourceEncodeDevicesParams = new GetResourceEncodeDevicesParams()
  ) {
    let plain = instanceToPlain(params);
    let url = ResourcesUrl.encodeDevice().list();
    return this.type.paged(url, plain);
  }
  protocols() {
    let url = ResourcesUrl.encodeDevice().protocols();
    return this.basic.getArray(url, Protocol);
  }
}

import { instanceToPlain } from 'class-transformer';
import { ResourceCrossing } from 'src/app/network/model/aiop/resource-crossing.model';
import { ResourcesUrl } from 'src/app/network/url/aiop/resources/resources.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../base-request-howell.service';
import { GetResourceCrossingsParams } from './resource-crossing.params';

export class ResourceCrossingService {
  type: HowellBaseTypeRequestService<ResourceCrossing>;
  constructor(basic: HowellBaseRequestService) {
    this.type = basic.type(ResourceCrossing);
  }

  create(data: ResourceCrossing) {
    let plain = instanceToPlain(data);
    let url = ResourcesUrl.crossing().basic();
    return this.type.post(url, plain);
  }
  get(id: string) {
    let url = ResourcesUrl.crossing().item(id);
    return this.type.get(url);
  }
  delete(id: string) {
    let url = ResourcesUrl.crossing().item(id);
    return this.type.delete(url);
  }
  update(data: ResourceCrossing) {
    let plain = instanceToPlain(data);
    let url = ResourcesUrl.crossing().item(data.Id);
    return this.type.put(url, plain as ResourceCrossing);
  }

  list(params = new GetResourceCrossingsParams()) {
    let plain = instanceToPlain(params);
    let url = ResourcesUrl.crossing().list();
    return this.type.paged(url, plain);
  }
}

import {
  ICreate,
  IDelete,
  IUpdate,
} from 'src/app/common/interfaces/bussiness.interface';
import { ResourceLabel } from 'src/app/network/model/garbage-station/resource-label.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { ResourcesUrl } from 'src/app/network/url/aiop/resources/resources.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../base-request-howell.service';
import { AbstractService } from '../../cache/cache.interface';
import { GetResourceLabelsParams } from './resource-label.params';

export class ResourceLabelRequestService
  extends AbstractService<ResourceLabel>
  implements
    ICreate<ResourceLabel>,
    IUpdate<ResourceLabel>,
    IDelete<ResourceLabel>
{
  async all(params = new GetResourceLabelsParams()): Promise<ResourceLabel[]> {
    let data: ResourceLabel[] = [];
    let index = 1;
    let paged: PagedList<ResourceLabel>;
    do {
      params.PageIndex = index;
      paged = await this.list(params);
      data = data.concat(paged.Data);
      index++;
    } while (index <= paged.Page.PageCount);
    return data;
  }
  private type: HowellBaseTypeRequestService<ResourceLabel>;
  constructor(private basic: HowellBaseRequestService) {
    super();
    this.type = basic.type(ResourceLabel);
  }

  create(data: ResourceLabel) {
    let url = ResourcesUrl.label().basic();
    return this.type.post(url, data);
  }

  binding(resourceId: string, labelId: string) {
    let url = ResourcesUrl.label(resourceId).item(labelId);
    return this.type.post(url);
  }

  get(id: string, resourceId?: string): Promise<ResourceLabel> {
    let url = ResourcesUrl.label(resourceId).item(id);
    return this.type.get(url);
  }
  update(data: ResourceLabel, resourceId?: string): Promise<ResourceLabel> {
    let url = ResourcesUrl.label(resourceId).item(data.Id);
    return this.type.put(url, data);
  }
  delete(id: string, resourceId?: string): Promise<ResourceLabel> {
    let url = ResourcesUrl.label(resourceId).item(id);
    return this.type.delete(url);
  }

  list(
    params: GetResourceLabelsParams = new GetResourceLabelsParams()
  ): Promise<PagedList<ResourceLabel>> {
    let url = ResourcesUrl.label().list();
    return this.type.paged(url, params);
  }

  array(labelId: string) {
    let url = ResourcesUrl.label().batch(labelId);
    return this.type.getArray(url);
  }
}

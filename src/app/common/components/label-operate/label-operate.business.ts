import { Injectable } from '@angular/core';
import { ResourceLabel } from 'src/app/network/model/garbage-station/resource-label.model';
import { GetResourceLabelsParams } from 'src/app/network/request/resources/label/resource-label.params';
import { ResourceRequestService } from 'src/app/network/request/resources/resource.service';

@Injectable()
export class LabelOperateBusiness {
  constructor(
    private service: ResourceRequestService,
    private _resourceRequest: ResourceRequestService
  ) {}

  listAllLabels(condition: string = '') {
    let params = new GetResourceLabelsParams();
    params.LabelName = condition;

    return this.service.label.list(params);
  }
  createLabel(name: string) {
    let label = new ResourceLabel();
    label.Name = name;
    label.Id = '';
    return this.service.label.create(label);
  }
  deleteLabel(id: string) {
    return this.service.delete(id);
  }
  async getResourceLabels(id: string, condition: string) {
    let labels = await this._resourceRequest.label.array(id);
    let res = labels.filter((label) => label.Name.includes(condition));
    return res;
  }
  deleteResourceLabel(resourceId: string, labelId: string) {
    return this._resourceRequest.label.delete(labelId, resourceId);
  }
}

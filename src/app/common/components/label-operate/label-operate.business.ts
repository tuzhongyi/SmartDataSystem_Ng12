import { Injectable } from "@angular/core";
import { ResourceLabel } from "src/app/network/model/resource-label.model";
import { GetResourceLabelsParams } from "src/app/network/request/label/label.params";
import { LabelRequestService } from "src/app/network/request/label/label.service";
import { ResourceRequestService } from "src/app/network/request/resources/resource.service";

@Injectable()
export class LabelOperateBusiness {

  constructor(private _labelRequest: LabelRequestService, private _resourceRequest: ResourceRequestService) { }

  listAllLabels(condition: string = '') {
    let params = new GetResourceLabelsParams();
    params.LabelName = condition;

    return this._labelRequest.list(params)
  }
  createLabel(name: string) {
    let label = new ResourceLabel();
    label.Name = name;
    label.Id = '';
    return this._labelRequest.create(label)
  }
  deleteLabel(id: string) {
    return this._labelRequest.delete(id)
  }
  async getResourceLabels(id: string, condition: string) {
    let labels = await this._resourceRequest.listLabels(id);
    let res = labels.filter(label => label.Name.includes(condition))
    return res;
  }
  deleteResourceLabel(resourceId: string, labelId: string) {
    return this._resourceRequest.deleteLabel(resourceId, labelId)
  }
}
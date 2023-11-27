import { Injectable } from '@angular/core';
import { ResourceRequestService } from 'src/app/network/request/resources/resource.service';

@Injectable()
export class LabelManageFormBusiness {
  constructor(private _resourceRequest: ResourceRequestService) {}

  addResourceLabel(resourceId: string, labelId: string) {
    return this._resourceRequest.label.binding(resourceId, labelId);
  }
  getResourceLabels(id: string) {
    return this._resourceRequest.label.array(id);
  }
}

import { Injectable } from '@angular/core';
import { GetResourceLabelsParams } from 'src/app/network/request/label/label.params';
import { LabelRequestService } from 'src/app/network/request/label/label.service';
import { ResourceRequestService } from 'src/app/network/request/resources/resource.service';

@Injectable()
export class LabelManageFormBusiness {
  constructor(private _resourceRequest: ResourceRequestService) {}

  addResourceLabel(resourceId: string, labelId: string) {
    return this._resourceRequest.label.create(labelId, resourceId);
  }
  getResourceLabels(id: string) {
    return this._resourceRequest.label.array(id);
  }
}

import { Injectable } from '@angular/core';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';

@Injectable()
export class MapControlTreePanelDivisionBusiness {
  constructor(private service: DivisionRequestService) {}

  async load(parentId: string) {
    let params = new GetDivisionsParams();
    params.ParentId = parentId;
    let paged = await this.service.cache.list(params);
    return paged.Data;
  }

  get(id: string) {
    return this.service.cache.get(id);
  }
}

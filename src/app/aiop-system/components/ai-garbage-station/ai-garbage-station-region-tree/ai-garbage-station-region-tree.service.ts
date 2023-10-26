import { Injectable } from '@angular/core';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { AIGarbageRegionsRequestService } from 'src/app/network/request/ai-garbage/region.service';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';

@Injectable()
export class AIGarbageRegionTreeService {
  constructor(
    private division: DivisionRequestService,
    private region: AIGarbageRegionsRequestService
  ) {}

  async regions() {
    let paged = await this.region.list();
    return paged.Data;
  }

  async divisions(ids: string[], all: Division[] = []) {
    let params = new GetDivisionsParams();

    params.Ids = ids;

    let paged = await this.division.list(params);

    if (paged && paged.Data && paged.Data.length > 0) {
      all = paged.Data.concat(all);
      let parentIds = paged.Data.filter((x) => !!x.ParentId).map(
        (x) => x.ParentId!
      );

      if (parentIds && parentIds.length > 0) {
        all = await this.divisions(parentIds, all);
      }
    }
    return all;
  }
}

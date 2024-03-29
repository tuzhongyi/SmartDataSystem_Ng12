import { Injectable } from '@angular/core';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';
import { AIGarbageRegion } from 'src/app/network/model/ai-garbage/region.model';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { AIGarbageDevicesRequestService } from 'src/app/network/request/ai-garbage/garbage-device.service';
import { AIGarbageRegionsRequestService } from 'src/app/network/request/ai-garbage/region.service';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';

@Injectable()
export class AIGarbageRegionTreeService {
  constructor(
    private division: DivisionRequestService,
    private region: AIGarbageRegionsRequestService,
    private device: AIGarbageDevicesRequestService
  ) {}

  private data = {
    region: [] as AIGarbageRegion[],
    device: [] as AIGarbageDevice[],
  };

  async regions(ids?: string[]) {
    if (this.data.region.length == 0) {
      this.data.region = await this.region.all();
    }
    if (ids && ids.length > 0) {
      return this.data.region.filter((region) => ids.includes(region.Id));
    }
    return this.data.region;
  }

  async devices() {
    if (this.data.device.length == 0) {
      this.data.device = await this.device.all();
    }
    return this.data.device;
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

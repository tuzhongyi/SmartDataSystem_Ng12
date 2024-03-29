import { Injectable } from '@angular/core';
import { GetAIGarbageStationRegionsParams } from 'src/app/network/request/ai-garbage/ai-garbage.params';
import { AIGarbageRequestService } from 'src/app/network/request/ai-garbage/ai-garbage.service';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class AIGarbageStationDeviceTableService {
  region: AIGarbageStationDeviceTableRegionService;
  constructor(
    public ai: AIGarbageRequestService,
    division: DivisionRequestService,
    public station: GarbageStationRequestService
  ) {
    this.region = new AIGarbageStationDeviceTableRegionService({
      ai: ai,
      division: division,
    });
  }
}

class AIGarbageStationDeviceTableRegionService {
  constructor(
    private service: {
      ai: AIGarbageRequestService;
      division: DivisionRequestService;
    }
  ) {}
  get(id: string) {
    return this.service.ai.region.get(id);
  }

  async array(divisionId: string) {
    let divisions = await this.divisions(divisionId);
    let divisionIds = [...divisions.Data.map((x) => x.Id), divisionId];
    return this.regions(divisionIds);
  }

  private regions(ids: string[]) {
    let params = new GetAIGarbageStationRegionsParams();
    params.DivisionIds = ids;
    return this.service.ai.region.all(params);
  }

  private divisions(id: string) {
    let params = new GetDivisionsParams();
    params.AncestorId = id;
    return this.service.division.cache.list(params);
  }
}

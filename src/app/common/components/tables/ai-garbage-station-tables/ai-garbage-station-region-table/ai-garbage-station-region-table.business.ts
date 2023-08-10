import { Injectable } from '@angular/core';
import { GetAIGarbageStationRegionsParams } from 'src/app/network/request/ai-garbage/ai-garbage.params';
import { AIGarbageRequestService } from 'src/app/network/request/ai-garbage/ai-garbage.service';
import { AIGarbageStationRegionTableArgs } from './ai-garbage-station-region-table.model';

@Injectable()
export class AIGarbageStationRegionTableBusiness {
  constructor(private service: AIGarbageRequestService) {}
  load(index: number, size: number, args: AIGarbageStationRegionTableArgs) {
    return this.getData(index, size, args);
  }

  private getData(
    index: number,
    size: number,
    args: AIGarbageStationRegionTableArgs
  ) {
    let params = new GetAIGarbageStationRegionsParams();
    params.PageIndex = index;
    params.PageSize = size;
    params.Asc = args.asc;
    params.Desc = args.desc;
    params.GarbageStationName = args.name;
    if (args.divisionId) {
      params.DivisionIds = [args.divisionId];
    }

    return this.service.region.list(params);
  }
}

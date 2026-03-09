import { Injectable } from '@angular/core';
import {
  GetAIGarbageStationRegionsParams,
  GetAIGarbageStationRfidCardsParams,
} from 'src/app/network/request/ai-garbage/ai-garbage.params';
import { AIGarbageRequestService } from 'src/app/network/request/ai-garbage/ai-garbage.service';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { AIGarbageStationRfidCardTableArgs } from './ai-garbage-station-rfid-card-table.model';

@Injectable()
export class AIGarbageStationRfidCardTableBusiness {
  constructor(
    garbage: AIGarbageRequestService,
    division: DivisionRequestService
  ) {
    this.service = { garbage, division };
  }

  load(index: number, size: number, args: AIGarbageStationRfidCardTableArgs) {
    return this.data.load(index, size, args);
  }

  private service: {
    garbage: AIGarbageRequestService;
    division: DivisionRequestService;
  };

  private data = {
    load: async (
      index: number,
      size: number,
      args: AIGarbageStationRfidCardTableArgs
    ) => {
      let params = new GetAIGarbageStationRfidCardsParams();
      params.PageIndex = index;
      params.PageSize = size;
      params.Asc = args.asc;
      params.Desc = args.desc;
      if (args.regionId) {
        params.RegionIds = [args.regionId];
      } else if (args.divisionId) {
        let regions = await this.data.region(args.divisionId);
        params.RegionIds = regions.map((x) => x.Id);
      }
      params.RegionName = args.name;
      return this.service.garbage.rfid.cards.list(params);
    },
    region: async (divisionId: string) => {
      let params = new GetAIGarbageStationRegionsParams();
      let divisions = await this.data.division(divisionId);
      params.DivisionIds = [divisionId, ...divisions.map((x) => x.Id)];
      return this.service.garbage.region.all(params);
    },
    division: (divisionId: string) => {
      let params = new GetDivisionsParams();
      params.AncestorId = divisionId;
      return this.service.division.cache.all(params);
    },
  };
}

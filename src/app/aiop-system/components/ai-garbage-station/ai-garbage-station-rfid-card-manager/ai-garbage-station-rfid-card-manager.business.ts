import { Injectable } from '@angular/core';
import { AIGarbageRegion } from 'src/app/network/model/ai-garbage/region.model';
import {
  GetAIGarbageStationRegionsParams,
  GetAIGarbageStationRfidCardsParams,
} from 'src/app/network/request/ai-garbage/ai-garbage.params';
import { AIGarbageRequestService } from 'src/app/network/request/ai-garbage/ai-garbage.service';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';

@Injectable()
export class AIGarbageStationRfidCardManagerBusiness {
  constructor(
    garbage: AIGarbageRequestService,
    division: DivisionRequestService
  ) {
    this.service = { garbage, division };
  }

  upload(file: any, regionId: string) {
    return this.service.garbage.rfid.cards.excel.post(file, {
      regionId: regionId,
    });
  }
  delete(ids: string[]) {
    let all = ids.map((x) => {
      return this.service.garbage.rfid.cards.delete(x);
    });
    return Promise.all(all);
  }

  private service: {
    garbage: AIGarbageRequestService;
    division: DivisionRequestService;
  };

  region = {
    list: async (divisionId: string) => {
      let params = new GetAIGarbageStationRegionsParams();
      let divisions = await this.region.divisions(divisionId);
      params.DivisionIds = [divisionId, ...divisions.map((x) => x.Id)];

      let list = await this.service.garbage.region.all(params);
      let result: AIGarbageRegion[] = [];
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        if (await this.region.existed(item.Id)) {
          result.push(item);
        }
      }
      return result;
    },
    divisions: async (divisionId: string) => {
      let params = new GetDivisionsParams();
      params.AncestorId = divisionId;
      return this.service.division.cache.all(params);
    },
    existed: async (regionId: string) => {
      let params = new GetAIGarbageStationRfidCardsParams();
      params.PageIndex = 1;
      params.PageSize = 1;
      params.RegionIds = [regionId];
      let data = await this.service.garbage.rfid.cards.list(params);
      return data.Page.TotalRecordCount > 0;
    },
  };

  download = {
    single: (filename: string, regionId: string) => {
      return this.service.garbage.rfid.cards.excel.get(filename, {
        regionId: regionId,
      });
    },
    multiple: (regions: AIGarbageRegion[]) => {
      for (let i = 0; i < regions.length; i++) {
        const item = regions[i];
        this.download.single(item.Name, item.Id);
      }
    },
  };
}

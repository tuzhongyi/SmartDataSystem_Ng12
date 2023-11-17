import { Injectable } from '@angular/core';
import { GetAIGarbageStationRfidCardsParams } from 'src/app/network/request/ai-garbage/ai-garbage.params';
import { AIGarbageRequestService } from 'src/app/network/request/ai-garbage/ai-garbage.service';
import { AIGarbageStationRfidCardTableArgs } from './ai-garbage-station-rfid-card-table.model';

@Injectable()
export class AIGarbageStationRfidCardTableBusiness {
  constructor(private service: AIGarbageRequestService) {}
  load(index: number, size: number, args: AIGarbageStationRfidCardTableArgs) {
    return this.getData(index, size, args);
  }

  private getData(
    index: number,
    size: number,
    args: AIGarbageStationRfidCardTableArgs
  ) {
    let params = new GetAIGarbageStationRfidCardsParams();
    params.PageIndex = index;
    params.PageSize = size;
    params.Asc = args.asc;
    params.Desc = args.desc;
    if (args.regionId) {
      params.RegionIds = [args.regionId];
    }
    params.RegionName = args.name;
    return this.service.rfid.cards.list(params);
  }
}

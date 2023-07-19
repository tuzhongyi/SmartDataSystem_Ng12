import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { PagedList } from 'src/app/network/model/page_list.model';
import { AIGarbageRfidCardRecord } from 'src/app/network/model/rfid-card-record.model';
import { GetAIGarbageStationRfidCardRecordsParams } from 'src/app/network/request/ai-garbage/ai-garbage.params';
import { AIGarbageRequestService } from 'src/app/network/request/ai-garbage/ai-garbage.service';

import { CardRecordTableArgs } from './card-record-table.model';

@Injectable()
export class CardRecordTableBusiness
  implements IBusiness<PagedList<AIGarbageRfidCardRecord>>
{
  constructor(private service: AIGarbageRequestService) {}
  async load(
    index: number,
    size: number = 10,
    args: CardRecordTableArgs
  ): Promise<PagedList<AIGarbageRfidCardRecord>> {
    let data = await this.getData(index, size, args);
    return data;
  }
  getData(
    index: number,
    size: number = 10,
    args: CardRecordTableArgs
  ): Promise<PagedList<AIGarbageRfidCardRecord>> {
    let params = new GetAIGarbageStationRfidCardRecordsParams();
    params.PageIndex = index;
    params.PageSize = size;
    params.BeginTime = args.duration.begin;
    params.EndTime = args.duration.end;
    if (args.stationId) {
      params.GarbageStationIds = [args.stationId];
    }

    params.BuildingNo = args.building;
    params.RoomNo = args.room;
    return this.service.rfid.cards.records.list(params);
  }
}

import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { EventType } from 'src/app/enum/event-type.enum';
import { DivisionNumberStatistic } from 'src/app/network/model/garbage-station/division-number-statistic.model';
import {
  GetDivisionsParams,
  GetDivisionStatisticNumbersParams,
} from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { RankModel } from 'src/app/view-model/rank.model';
import { DaPuQiaoMainRecordLevelArgs } from './dapuqiao-main-record-level.model';

@Injectable()
export class DaPuQiaoMainRecordLevelBusiness
  implements IBusiness<DivisionNumberStatistic[], RankModel[]>
{
  constructor(
    private service: DivisionRequestService,
    private global: GlobalStorageService
  ) {}

  async load(args: DaPuQiaoMainRecordLevelArgs): Promise<RankModel[]> {
    let divisions = await this.divisions(this.global.divisionId);
    let data = await this.getData(divisions.map((x) => x.Id));
    let result = data.map((x) => {
      return this.convert(x, args.type);
    });
    result = result.sort((a, b) => {
      return b.value - a.value;
    });
    while (result.length < 6) {
      let item = new RankModel(undefined);
      item.name = '-';
      result.push(item);
    }
    return result;
  }
  async getData(divisionIds: string[]): Promise<DivisionNumberStatistic[]> {
    let params = new GetDivisionStatisticNumbersParams();
    params.Ids = divisionIds;
    let response = await this.service.statistic.number.list(params);
    return response.Data;
  }

  async divisions(divisionId: string) {
    let params = new GetDivisionsParams();
    params.ParentId = divisionId;
    let paged = await this.service.cache.list(params);
    return paged.Data;
  }

  convert(input: DivisionNumberStatistic, type: EventType): RankModel {
    let item = new RankModel(input);
    item.id = input.Id;
    item.name = input.Name;
    item.unit = '起';
    let value = 0;
    if (input.TodayEventNumbers) {
      let event = input.TodayEventNumbers.find((x) => x.EventType === type);
      if (event) {
        value = event.DayNumber;
      }
    }
    item.value = value;
    item.statistic = item.value.toFixed(0);
    return item;
  }
}

import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { EventNumber } from 'src/app/network/model/garbage-station/event-number.model';
import {
  GetDivisionsParams,
  GetDivisionStatisticNumbersParams,
  GetDivisionStatisticNumbersParamsV2,
} from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import {
  DaPuQiaoMainEventLevelArgs,
  DaPuQiaoMainEventLevelModel,
} from './dapuqiao-main-event-level.model';

@Injectable()
export class DaPuQiaoMainEventLevelBusiness
  implements IBusiness<EventNumber[], DaPuQiaoMainEventLevelModel>
{
  constructor(
    private service: DivisionRequestService,
    private global: GlobalStorageService
  ) {}

  async load(args: DaPuQiaoMainEventLevelArgs) {
    let data = await this.getData(args);
    let model = this.convert(data);
    return model;
  }

  convert(source: EventNumber[]) {
    let model = new DaPuQiaoMainEventLevelModel();
    for (let i = 0; i < source.length; i++) {
      const event = source[i];

      let item = model.items.find((x) => x.key === event.EventType);
      if (item) {
        item.value += event.DayNumber;
      }
    }
    return model;
  }

  async getData(args: DaPuQiaoMainEventLevelArgs) {
    let divisionId = args.divisionId;
    if (!divisionId) {
      divisionId = this.global.divisionId;
    }
    let divisions = await this.divisions(divisionId);
    let ids = divisions.map((x) => x.Id);
    if (args.unit === TimeUnit.Day) {
      return this.today(ids);
    } else {
      return this.history(ids, args.unit);
    }
  }

  private async today(ids: string[]) {
    let params = new GetDivisionStatisticNumbersParams();

    params.Ids = ids;
    return this.service.statistic.number.list(params).then((paged) => {
      let array: EventNumber[] = [];
      for (let i = 0; i < paged.Data.length; i++) {
        const data = paged.Data[i];
        if (data.TodayEventNumbers) {
          array = array.concat(data.TodayEventNumbers);
        }
      }
      return array;
    });
  }

  private history(ids: string[], unit: TimeUnit, date: Date = new Date()) {
    let duration = DateTimeTool.TimeUnit(unit, date);
    let params = new GetDivisionStatisticNumbersParamsV2();
    params.DivisionIds = ids;
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.TimeUnit = unit;
    return this.service.statistic.number.history.list(params).then((x) => {
      let array: EventNumber[] = [];
      x.forEach((x) => {
        if (x.EventNumbers) {
          array = array.concat(x.EventNumbers);
        }
      });
      return array;
    });
  }

  async divisions(divisionId: string) {
    let params = new GetDivisionsParams();
    params.ParentId = divisionId;
    let paged = await this.service.cache.list(params);
    return paged.Data;
  }
}

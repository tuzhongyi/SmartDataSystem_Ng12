import { Injectable } from '@angular/core';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import {
  GetGarbageStationsParams,
  GetGarbageStationStatisticNumbersParamsV2,
} from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { GarbageStationWeightChartArgs } from '../garbage-station-weight-chart.model';

@Injectable()
export class GarbageStationWeightChartStationService {
  constructor(private service: GarbageStationRequestService) {}

  getData(args: GarbageStationWeightChartArgs) {
    let params = new GetGarbageStationStatisticNumbersParamsV2();
    switch (args.unit) {
      case TimeUnit.Day:
        params.TimeUnit = TimeUnit.Hour;
        break;
      case TimeUnit.Week:
        params.TimeUnit = TimeUnit.Day;
        break;
      case TimeUnit.Month:
        params.TimeUnit = TimeUnit.Day;
        break;
      case TimeUnit.Year:
        params.TimeUnit = TimeUnit.Month;
        break;

      default:
        break;
    }

    let duration = DateTimeTool.TimeUnit(args.unit, args.date);
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.GarbageStationIds = [args.id];
    return this.service.statistic.number.history.list(params).then((x) => {
      return x.sort((a, b) => {
        return (
          (a.Time.Year ?? 0) - (b.Time.Year ?? 0) ||
          (a.Time.Month ?? 0) - (b.Time.Month ?? 0) ||
          (a.Time.Week ?? 0) - (b.Time.Week ?? 0) ||
          (a.Time.Day ?? 0) - (b.Time.Day ?? 0)
        );
      });
    });
  }

  get(id: string) {
    return this.service.cache.get(id);
  }

  async default() {
    let params = new GetGarbageStationsParams();
    params.PageIndex = 1;
    params.PageSize = 1;
    let paged = await this.service.list(params);
    return paged.Data[0];
  }

  async list(divisionId: string) {
    let params = new GetGarbageStationsParams();
    params.DivisionId = divisionId;
    let paged = await this.service.list(params);
    return paged.Data;
  }
}

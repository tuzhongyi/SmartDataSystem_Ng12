import { Injectable } from '@angular/core';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { GetDivisionStatisticNumbersParamsV2 } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationWeightChartArgs } from '../garbage-station-weight-chart.model';

@Injectable()
export class GarbageStationWeightChartDivisionService {
  constructor(private service: DivisionRequestService) {}

  getData(args: GarbageStationWeightChartArgs) {
    let params = new GetDivisionStatisticNumbersParamsV2();
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
    params.DivisionIds = [args.id];
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

  async default() {
    let params = new GetGarbageStationsParams();
    params.PageIndex = 1;
    params.PageSize = 1;
    let paged = await this.service.list(params);
    return paged.Data[0];
  }

  get(id: string) {
    return this.service.get(id);
  }

  list() {
    return this.service.cache.all();
  }
}

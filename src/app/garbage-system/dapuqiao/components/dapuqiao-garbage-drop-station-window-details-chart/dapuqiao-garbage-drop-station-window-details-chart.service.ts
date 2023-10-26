import { Injectable } from '@angular/core';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import {
  GetDivisionStatisticNumbersParams,
  GetDivisionStatisticNumbersParamsV2,
} from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import {
  GetGarbageStationsParams,
  GetGarbageStationStatisticNumbersParams,
  GetGarbageStationStatisticNumbersParamsV2,
} from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { DapuqiaoGarbageDropStationWindowDetailsChartArgs } from './dapuqiao-garbage-drop-station-window-details-chart.model';

@Injectable()
export class DapuqiaoGarbageDropStationWindowDetailsChartService {
  constructor(
    division: DivisionRequestService,
    station: GarbageStationRequestService
  ) {
    this.service = {
      division: new DivisionService(division),
      station: new GarbageStationService(station),
    };
  }
  private service: {
    division: DivisionService;
    station: GarbageStationService;
  };

  async today(args: DapuqiaoGarbageDropStationWindowDetailsChartArgs) {
    if (args.stationId) {
      return this.service.station.today(args.stationId);
    } else {
      return this.service.division.today(args.divisionId!);
    }
  }
  async history(args: DapuqiaoGarbageDropStationWindowDetailsChartArgs) {
    let unit: TimeUnit;
    switch (args.unit) {
      case TimeUnit.Year:
        unit = TimeUnit.Month;
        break;
      case TimeUnit.Month:
      case TimeUnit.Week:
      default:
        unit = TimeUnit.Day;
        break;
    }
    let duration = DateTimeTool.TimeUnit(args.unit, args.date);
    if (args.stationId) {
      return this.service.station.history(args.stationId, unit, duration);
    } else {
      return this.service.division.history(args.divisionId!, unit, duration);
    }
  }

  stations(divisionId?: string) {
    return this.service.station.list(divisionId);
  }
}
class DivisionService {
  constructor(private service: DivisionRequestService) {}

  async today(id: string) {
    let params = new GetDivisionStatisticNumbersParams();
    params.Ids = [id];
    let paged = await this.service.statistic.number.list(params);
    return paged.Data;
  }

  async history(id: string, unit: TimeUnit, duration: Duration) {
    let params = new GetDivisionStatisticNumbersParamsV2();
    params.DivisionIds = [id];
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.TimeUnit = unit;
    return this.service.statistic.number.history.list(params);
  }

  get(id: string) {
    return this.service.cache.get(id);
  }
}
class GarbageStationService {
  constructor(private service: GarbageStationRequestService) {}

  async today(id: string) {
    let params = new GetGarbageStationStatisticNumbersParams();
    params.Ids = [id];
    let paged = await this.service.statistic.number.list(params);
    return paged.Data;
  }

  async history(id: string, unit: TimeUnit, duration: Duration) {
    let params = new GetGarbageStationStatisticNumbersParamsV2();
    params.GarbageStationIds = [id];
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.TimeUnit = unit;
    return this.service.statistic.number.history.list(params);
  }

  list(divisionId?: string) {
    let params = new GetGarbageStationsParams();
    params.AncestorId = divisionId;
    return this.service.all(params);
  }
}

import { Injectable } from '@angular/core';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import {
  GetGarbageStationsParams,
  GetGarbageStationStatisticNumbersParamsV2,
} from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { GarbageStationWeightTableArgs } from '../garbage-station-weight-table.model';

@Injectable()
export class GarbageStationWeightTableStationService {
  constructor(private service: GarbageStationRequestService) {}

  async getData(args: GarbageStationWeightTableArgs) {
    let params = new GetGarbageStationStatisticNumbersParamsV2();
    params.TimeUnit = args.unit;
    let duration = DateTimeTool.TimeUnit(args.unit, args.date);
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;

    let source = await this.source(args.divisionId);
    if (!source || source.length === 0) {
      return [];
    }
    params.GarbageStationIds = source.map((x) => x.Id);
    return this.service.statistic.number.history.list(params);
  }

  async source(divisionId?: string) {
    let params = new GetGarbageStationsParams();
    params.DivisionId = divisionId;
    let paged = await this.service.list(params);
    return paged.Data;
  }

  get(stationId: string) {
    return this.service.get(stationId);
  }
}

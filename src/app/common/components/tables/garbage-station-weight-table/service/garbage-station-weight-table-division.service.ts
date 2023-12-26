import { Injectable } from '@angular/core';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { DivisionType } from 'src/app/enum/division-type.enum';
import {
  GetDivisionsParams,
  GetDivisionStatisticNumbersParamsV2,
} from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GarbageStationWeightTableArgs } from '../garbage-station-weight-table.model';

@Injectable()
export class GarbageStationWeightTableDivisionService {
  constructor(private service: DivisionRequestService) {}

  async getData(args: GarbageStationWeightTableArgs) {
    let params = new GetDivisionStatisticNumbersParamsV2();
    params.TimeUnit = args.unit;
    let duration = DateTimeTool.TimeUnit(args.unit, args.date);
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    let source = await this.source(args.type, args.divisionId);
    if (!source || source.length === 0) {
      return [];
    }
    params.DivisionIds = source.map((x) => x.Id);
    return this.service.statistic.number.history.list(params);
  }

  async source(type: DivisionType, parentId?: string) {
    let params = new GetDivisionsParams();
    params.DivisionType = type;
    params.ParentId = parentId;
    let paged = await this.service.list(params);
    return paged.Data;
  }

  get(id: string) {
    return this.service.cache.get(id);
  }
}

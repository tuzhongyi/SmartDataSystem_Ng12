import { Injectable } from '@angular/core';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { DivisionNumberStatistic } from 'src/app/network/model/garbage-station/division-number-statistic.model';
import { SRServerRequestService } from 'src/app/network/request/ai-sr-server/sr-server.service';
import {
  GetDivisionsParams,
  GetDivisionStatisticNumbersParams,
  GetDivisionStatisticNumbersParamsV2,
} from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { AuditStatisticArgs } from './audit-statistic-data.model';

@Injectable()
export class AuditStatisticDataService {
  constructor(
    public sr: SRServerRequestService,
    public station: GarbageStationRequestService,
    division: DivisionRequestService
  ) {
    this.division = new AuditStatisticDivisionService(division);
  }

  division: AuditStatisticDivisionService;
}

class AuditStatisticDivisionService {
  constructor(private service: DivisionRequestService) {}

  async history(args: AuditStatisticArgs, divisionId?: string) {
    let params = new GetDivisionStatisticNumbersParamsV2();
    let duration = DateTimeTool.TimeUnit(args.unit, args.date);
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.TimeUnit = args.unit;
    if (divisionId) {
      params.DivisionIds = [divisionId];
      return this.service.statistic.number.history.list(params);
    } else {
      let divisions = await this.list();
      params.DivisionIds = divisions.map((x) => x.Id);
      return this.service.statistic.number.history.list(params);
    }
  }

  statistic(): Promise<DivisionNumberStatistic[]>;
  statistic(divisionId: string): Promise<DivisionNumberStatistic>;

  async statistic(
    divisionId?: string
  ): Promise<DivisionNumberStatistic | DivisionNumberStatistic[]> {
    if (divisionId) {
      return this.service.statistic.number.get(divisionId);
    }
    let params = new GetDivisionStatisticNumbersParams();

    let divisions = await this.list();
    params.Ids = divisions.map((x) => x.Id);

    let paged = await this.service.statistic.number.list(params);
    return paged.Data;
  }

  private async list() {
    let params = new GetDivisionsParams();
    params.DivisionType = DivisionType.City;
    let paged = await this.service.list(params);
    return paged.Data;
  }
}

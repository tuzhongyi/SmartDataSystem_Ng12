import { Injectable } from '@angular/core';
import { Tool } from 'src/app/common/tools/tool';
import { DivisionNumberStatistic } from 'src/app/network/model/garbage-station/division-number-statistic.model';
import { AuditStatisticPlusTool } from './audit-statistic-data-plus.tool';
import { AuditStatisticStatistic } from './audit-statistic-data.model';
import { AuditStatisticDataService } from './audit-statistic-data.service';

@Injectable()
export class AuditStatisticBusiness {
  constructor(
    private service: AuditStatisticDataService,
    private plus: AuditStatisticPlusTool
  ) {}
  async load(divisionId?: string) {
    return this.statistic(divisionId);
  }
  getData(...args: any): Promise<AuditStatisticStatistic> {
    throw new Error('Method not implemented.');
  }

  async statistic(divisionId?: string) {
    let result: DivisionNumberStatistic;
    if (divisionId) {
      result = await this.service.division.statistic(divisionId);
    } else {
      let array = await this.service.division.statistic();
      result = Tool.sum(array, (a, b) =>
        this.plus.DivisionNumberStatistic(a, b)
      );
    }
    return result;
  }
}

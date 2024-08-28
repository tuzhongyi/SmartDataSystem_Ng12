import { Injectable } from '@angular/core';
import { Tool } from 'src/app/common/tools/tool';
import { DivisionNumberStatistic } from 'src/app/network/model/garbage-station/division-number-statistic.model';
import { AuditStatisticDataPlusTool } from '../audit-statistic-data-plus.tool';
import { AuditStatisticDataService } from '../service/audit-statistic-data.service';

@Injectable()
export class AuditStatisticDataBusiness {
  constructor(
    private service: AuditStatisticDataService,
    private plus: AuditStatisticDataPlusTool
  ) {}

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

  abnomal = {
    station: (divisionId?: string, hours?: number) => {
      return this.service.station.abnomal.statistic(divisionId, hours);
    },
    camera: (divisionId?: string, hours?: number) => {
      return this.service.camera.abnomal.statistic(divisionId, hours);
    },
  };
}

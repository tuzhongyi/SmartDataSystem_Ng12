import { Injectable } from '@angular/core';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { DivisionNumberStatisticV2 } from 'src/app/network/model/division-number-statistic-v2.model';
import { GetDivisionStatisticNumbersParamsV2 } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';

@Injectable()
export class DapuqiaoMainEventStatisticService {
  constructor(private service: DivisionRequestService) {}

  today(divisionId: string) {
    return this.service.statistic.number.get(divisionId);
  }
  async history(divisionId: string, unit: TimeUnit) {
    return new Promise<DivisionNumberStatisticV2>((resolve) => {
      let duration = DateTimeTool.TimeUnit(unit, new Date());
      let params = new GetDivisionStatisticNumbersParamsV2();
      params.BeginTime = duration.begin;
      params.EndTime = duration.end;
      params.DivisionIds = [divisionId];
      params.TimeUnit = unit;
      this.service.statistic.number.history.list(params).then((array) => {
        if (array.length > 0) {
          resolve(array[0]);
        }
      });
    });
  }
}

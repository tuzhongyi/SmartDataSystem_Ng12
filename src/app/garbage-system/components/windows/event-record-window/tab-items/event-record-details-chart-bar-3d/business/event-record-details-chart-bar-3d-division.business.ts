import { Injectable } from '@angular/core';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import { GetDivisionEventNumbersParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { EventRecordWindowDetailsConverter } from '../../event-record-window-details/event-record-window-details.converter';

@Injectable()
export class EventRecordDetailsChartBarD3DivisionBusiness {
  constructor(private service: DivisionRequestService) {}
  private converter = new EventRecordWindowDetailsConverter();
  async today(divisionId: string) {
    let data = await this.service.statistic.number.get(divisionId);
    return this.converter.division(data);
  }

  async history(divisionId: string, duration: Duration) {
    let params = new GetDivisionEventNumbersParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.TimeUnit = TimeUnit.Hour;
    let paged = await this.service.eventNumber.history.list(divisionId, params);
    let data = await paged.Data.map((x) =>
      this.converter.statistic(divisionId, x)
    );
    if (DateTimeTool.isToday(duration.end)) {
      let today = await this.today(divisionId);
      return data.concat(today);
    }
    return data;
  }
}

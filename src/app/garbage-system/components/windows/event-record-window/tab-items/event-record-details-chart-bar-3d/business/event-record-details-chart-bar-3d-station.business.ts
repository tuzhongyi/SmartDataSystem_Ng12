import { Injectable } from '@angular/core';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import { GetGarbageStationVolumesParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { EventRecordWindowDetailsConverter } from '../../event-record-window-details/event-record-window-details.converter';

@Injectable()
export class EventRecordDetailsChartBarD3StationBusiness {
  constructor(private service: GarbageStationRequestService) {}

  private converter = new EventRecordWindowDetailsConverter();

  async today(stationId: string) {
    let data = await this.service.statistic.number.cache.get(stationId);
    return this.converter.station(data);
  }

  async history(stationId: string, duration: Duration) {
    let params = new GetGarbageStationVolumesParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.TimeUnit = TimeUnit.Hour;
    let paged = await this.service.eventNumber.history.list(stationId, params);
    let data = await paged.Data.map((x) =>
      this.converter.statistic(stationId, x)
    );
    if (DateTimeTool.isToday(duration.end)) {
      let today = await this.today(stationId);
      return data.concat(today);
    }
    return data;
  }
}

import { Injectable } from '@angular/core';
import { GetGarbageStationStatisticNumbersParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class AMapService {
  constructor(private service: GarbageStationRequestService) {}

  async statistic(stationIds: string[]) {
    let params = new GetGarbageStationStatisticNumbersParams();
    params.Ids = stationIds;
    let paged = await this.service.statistic.number.list(params);
    return paged.Data;
  }

  all() {
    return this.service.all();
  }
  get(id: string) {
    return this.service.get(id);
  }
}

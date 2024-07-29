import { Injectable } from '@angular/core';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageStationStatisticNumbersParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class MapPointInfoPanelService {
  station: MapPointInfoPanelStationService;
  constructor(
    station: GarbageStationRequestService,
    public division: DivisionRequestService
  ) {
    this.station = new MapPointInfoPanelStationService(station);
  }
}

class MapPointInfoPanelStationService {
  constructor(private service: GarbageStationRequestService) {}
  statistic(stationId: string) {
    return this.service.statistic.number.cache.get(stationId);
  }

  async drop(stationId: string) {
    let params = new GetGarbageStationStatisticNumbersParams();
    params.GarbageDrop = true;
    let list = await this.service.statistic.number.list(params);
    return list.Data.findIndex((x) => x.Id == stationId) >= 0;
  }
}

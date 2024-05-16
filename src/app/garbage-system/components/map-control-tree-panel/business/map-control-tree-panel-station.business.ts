import { Injectable } from '@angular/core';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class MapControlTreePanelStationBusiness {
  constructor(private service: GarbageStationRequestService) {}

  load(divisionId: string) {
    return this.service.cache.all().then((station) => {
      return station.filter((x) => x.DivisionId === divisionId);
    });
  }
}

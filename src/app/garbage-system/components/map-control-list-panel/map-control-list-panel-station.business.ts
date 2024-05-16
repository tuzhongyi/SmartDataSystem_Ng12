import { Injectable } from '@angular/core';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class ListPanelStationBusiness {
  constructor(private service: GarbageStationRequestService) {}

  load(divisionId: string) {
    return this.service.cache.all().then((station) => {
      return station.filter((x) => x.DivisionId === divisionId);
    });
  }
  search(name: string) {
    return this.service.cache.all().then((station) => {
      return station.filter((x) =>
        x.Name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
      );
    });
  }
}

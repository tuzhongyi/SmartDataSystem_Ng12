import { Injectable } from '@angular/core';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class DeployMapStationBusiness {
  constructor(private service: GarbageStationRequestService) {}
  update(station: GarbageStation) {
    return this.service.update(station);
  }
  get(id: string) {
    return this.service.cache.get(id);
  }
}

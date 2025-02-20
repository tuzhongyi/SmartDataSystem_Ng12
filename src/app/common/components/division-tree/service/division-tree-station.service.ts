import { Injectable } from '@angular/core';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class DivisionTreeStationService {
  constructor(private service: GarbageStationRequestService) {}

  async list(divisionId?: string) {
    let params = new GetGarbageStationsParams();
    if (divisionId) {
      params.DivisionId = divisionId;
      if (this.service.cache.loaded) {
        return this.service.cache.all(params);
      }
      return this.service.all(params);
    }
    return this.service.cache.all(params);
  }
  async search(condition: string) {
    let params = new GetGarbageStationsParams();
    params.Name = condition;
    return await this.service.cache.all(params);
  }
}

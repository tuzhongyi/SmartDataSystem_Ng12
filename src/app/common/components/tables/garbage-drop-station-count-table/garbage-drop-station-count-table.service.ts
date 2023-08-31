import { Injectable } from '@angular/core';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class GarbageDropStationCountTableService {
  constructor(
    public division: DivisionRequestService,
    public station: GarbageStationRequestService
  ) {}

  async stations(divisionId: string) {
    let params = new GetGarbageStationsParams();
    params.DivisionId = divisionId;
    let paged = await this.station.cache.list(params);
    return paged.Data;
  }
  async divisions(parentId: string) {
    let params = new GetDivisionsParams();
    params.ParentId = parentId;
    let paged = await this.division.cache.list(params);
    return paged.Data;
  }
}

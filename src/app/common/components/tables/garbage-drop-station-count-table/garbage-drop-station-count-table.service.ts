import { Injectable } from '@angular/core';
import { DivisionType } from 'src/app/enum/division-type.enum';
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
  async divisions(parentId: string, type: DivisionType) {
    let params = new GetDivisionsParams();
    params.AncestorId = parentId;
    params.DivisionType = type;
    let paged = await this.division.cache.list(params);
    return paged.Data;
  }
}

import { Injectable } from '@angular/core';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { UserRequestService } from 'src/app/network/request/user/user-request.service';

@Injectable()
export class CommitteesIndexService {
  constructor(
    private division: DivisionRequestService,
    private station: GarbageStationRequestService,
    private user: UserRequestService
  ) {}

  getUser() {}

  getCommittees(divisionId: string) {
    return this.division.cache.get(divisionId);
  }

  async getStationList(divisionId: string) {
    let params = new GetGarbageStationsParams();
    params.DivisionId = divisionId;
    let paged = await this.station.cache.list(params);
    return paged.Data;
  }
}

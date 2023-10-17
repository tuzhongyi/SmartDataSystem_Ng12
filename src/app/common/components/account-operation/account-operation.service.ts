import { Injectable } from '@angular/core';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { UserRequestService } from 'src/app/network/request/user/user-request.service';

@Injectable()
export class AccountOperationService {
  constructor(
    private division: DivisionRequestService,
    private station: GarbageStationRequestService,
    private user: UserRequestService
  ) {}

  heart(id: string) {
    return this.user.get(id);
  }
  clear() {
    this.division.cache.clear();
    this.station.cache.clear();
    this.division.statistic.number.cache.clear();
    this.station.statistic.number.cache.clear();
  }
}

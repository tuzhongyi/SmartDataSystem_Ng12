import { Injectable } from '@angular/core';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class AccountOperationService {
  constructor(
    private division: DivisionRequestService,
    private station: GarbageStationRequestService
  ) {}
  clear() {
    this.division.cache.clear();
    this.station.cache.clear();
    this.division.statistic.number.cache.clear();
    this.station.statistic.number.cache.clear();
  }
}

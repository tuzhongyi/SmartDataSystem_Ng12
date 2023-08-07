import { Injectable } from '@angular/core';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { GarbageStationWeightListDivisionService } from './service/garbage-station-weight-list-division.service';

@Injectable()
export class GarbageStationWeightListService {
  constructor(
    public division: GarbageStationWeightListDivisionService,
    public station: GarbageStationRequestService
  ) {}
}

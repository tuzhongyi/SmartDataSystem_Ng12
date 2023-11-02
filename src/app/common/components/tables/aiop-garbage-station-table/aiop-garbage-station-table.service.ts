import { Injectable } from '@angular/core';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class AIOPGarbageStationTableService {
  constructor(
    public station: GarbageStationRequestService,
    public division: DivisionRequestService
  ) {}
}

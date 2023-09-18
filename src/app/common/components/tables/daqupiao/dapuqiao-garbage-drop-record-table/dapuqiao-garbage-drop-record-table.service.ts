import { Injectable } from '@angular/core';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { EventRequestService } from 'src/app/network/request/event/event-request.service';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class DaPuQiaoGarbageDropRecordTableService {
  constructor(
    public event: EventRequestService,
    public division: DivisionRequestService,
    public station: GarbageStationRequestService
  ) {}
}

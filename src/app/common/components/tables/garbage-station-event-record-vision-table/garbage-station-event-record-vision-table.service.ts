import { Injectable } from '@angular/core';
import { EventRequestService } from 'src/app/network/request/event/event-request.service';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class GarbageStationEventRecordVisionTableService {
  constructor(
    public event: EventRequestService,
    public station: GarbageStationRequestService
  ) {}
}

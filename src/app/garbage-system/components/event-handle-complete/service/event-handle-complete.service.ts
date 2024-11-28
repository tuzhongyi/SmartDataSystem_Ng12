import { Injectable } from '@angular/core';
import { EventRequestService } from 'src/app/network/request/event/event-request.service';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { EventHandleCompleteGarbageDropService } from './event-handle-complete-garbage-drop.service';
import { EventHandleCompleteGarbageFullService } from './event-handle-complete-garbage-full.service';
import { EventHandleCompleteMixedIntoService } from './event-handle-complete-mixed-into.service';

@Injectable()
export class EventHandleCompleteService {
  constructor(
    event: EventRequestService,
    public station: GarbageStationRequestService
  ) {
    this.event = {
      drop: new EventHandleCompleteGarbageDropService(event),
      full: new EventHandleCompleteGarbageFullService(event),
      mixed: new EventHandleCompleteMixedIntoService(event),
    };
  }

  event: {
    drop: EventHandleCompleteGarbageDropService;
    full: EventHandleCompleteGarbageFullService;
    mixed: EventHandleCompleteMixedIntoService;
  };
}

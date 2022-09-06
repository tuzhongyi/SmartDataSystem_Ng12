import { Injectable } from '@angular/core';
import { EventRecordSmokeWindowDivisionBusiness } from './business/event-record-smoke-window-division.business';

@Injectable()
export class EventRecordSmokeWindowBusiness {
  constructor(public division: EventRecordSmokeWindowDivisionBusiness) {}
}

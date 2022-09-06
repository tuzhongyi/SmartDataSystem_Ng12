import { EventEmitter, Injectable } from '@angular/core';
import { EventRecord } from '../../model/event-record.model';

@Injectable({
  providedIn: 'root',
})
export class EventPushService {
  pushEvent: EventEmitter<EventRecord>;
  connectionState: EventEmitter<boolean>;
  constructor() {
    this.pushEvent = new EventEmitter<EventRecord>();
    this.connectionState = new EventEmitter<boolean>();
  }
}

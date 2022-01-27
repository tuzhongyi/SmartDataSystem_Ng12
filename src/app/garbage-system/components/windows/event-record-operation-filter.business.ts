import { EventEmitter, Injectable } from '@angular/core';
import { EventRecordFilter } from 'src/app/common/components/tables/event-record-table/event-record.model';

@Injectable()
export class EventRecordOperationFilterBusiness {
  constructor() {
    this.filter = new EventRecordFilter();
  }
  show = false;
  filter: EventRecordFilter;

  load: EventEmitter<EventRecordFilter> = new EventEmitter();

  search(text: string) {
    this.filter.text = text;
    this.load.emit(this.filter);
  }

  display() {
    this.show = !this.show;
  }

  onfilter(filter: EventRecordFilter) {
    this.filter = filter;
  }
}

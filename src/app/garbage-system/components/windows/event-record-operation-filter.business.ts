import { EventEmitter, Injectable } from '@angular/core';
import { EventRecordFilter } from 'src/app/common/components/tables/event-record/event-record.model';
import { SearchOptions } from 'src/app/view-model/search-options.model';

@Injectable()
export class EventRecordOperationFilterBusiness {
  constructor() {
    this.filter = new EventRecordFilter();
  }
  show = false;
  filter: EventRecordFilter;

  load: EventEmitter<EventRecordFilter> = new EventEmitter();

  onsearch(opts: SearchOptions) {
    this.filter.opts = opts;
    this.load.emit(this.filter);
  }

  display() {
    this.show = !this.show;
  }
}

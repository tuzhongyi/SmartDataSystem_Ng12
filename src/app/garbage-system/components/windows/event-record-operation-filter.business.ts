import { EventEmitter } from '@angular/core';
import { EventRecordFilter } from 'src/app/common/components/tables/event-record/event-record.model';
import { SearchOptions } from 'src/app/view-model/search-options.model';

export class EventRecordOperationFilter extends EventRecordFilter {
  constructor() {
    super();
  }
  show = false;

  load: EventEmitter<EventRecordFilter> = new EventEmitter();

  onsearch(opts: SearchOptions) {
    this.opts = opts;
    this.load.emit(this);
  }

  display() {
    this.show = !this.show;
    if (!this.show) {
      this.reset();
    }
  }
}

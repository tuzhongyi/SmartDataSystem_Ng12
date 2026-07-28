import { EventEmitter } from '@angular/core';
import { EventRecordFilter } from 'src/app/common/components/tables/event-record/event-record.model';
import { DateTimeTool } from 'src/app/common/tools/date-time-tool/datetime.tool';
import { GarbageFullEventData } from 'src/app/network/model/garbage-station/event-record/garbage-full-event-record.model';
import { IllegalDropEventData } from 'src/app/network/model/garbage-station/event-record/illegal-drop-event-record.model';
import { MixedIntoEventData } from 'src/app/network/model/garbage-station/event-record/mixed-into-event-record.model';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import {
  ISearchOptions,
  SearchOptionKey
} from 'src/app/view-model/search-options.model';

export class EventRecordOperationFilter extends EventRecordFilter {
  constructor() {
    super();
  }
  show = false;
  day?: number = 0;
  load: EventEmitter<EventRecordFilter> = new EventEmitter();
  findable = true;
  onsearch(opts: ISearchOptions) {
    this.opts = opts;
    this.load.emit(this);
  }

  display() {
    this.show = !this.show;
    if (!this.show) {
      this.reset();
    }
  }

  private _on = false;

  on = {
    day: (day?: number) => {
      if (this._on) return;
      this._on = true;
      switch (day) {
        case 0:
          this.duration = DateTimeTool.allDay(new Date());
          break;
        case undefined:
          break;
        default:
          this.duration = DateTimeTool.beforeDay(new Date(), day);
          break;
      }
      setTimeout(() => {
        this._on = false;
      });
    },
    duration: () => {
      if (this._on) return;
      this.day = undefined;
    },
    find: (data: EventRecordViewModel) => {
      if (
        data.Data instanceof GarbageFullEventData ||
        data.Data instanceof IllegalDropEventData ||
        data.Data instanceof MixedIntoEventData
      ) {
        this.opts.text = data.Data.StationName;
        this.opts.key = SearchOptionKey.name;
        this.onsearch(this.opts);
      }
    }
  };
}

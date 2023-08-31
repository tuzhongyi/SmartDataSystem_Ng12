import { Injectable } from '@angular/core';
import { IndexSuperviseCompleteWindowBusiness } from './index-supervise-complete-window.business';
import { IndexSuperviseDetailWindowBusiness } from './index-supervise-deatils-window.business';
import { IndexSuperviseTableWindowBusiness } from './index-supervise-table-window.business';

@Injectable()
export class IndexSuperviseWindowBusiness {
  constructor(
    public table: IndexSuperviseTableWindowBusiness,
    public detail: IndexSuperviseDetailWindowBusiness,
    public complete: IndexSuperviseCompleteWindowBusiness
  ) {
    table.show = true;
    table.select.subscribe((x) => {
      detail.eventId = x.EventId;
      detail.show = true;
    });
    table.details.subscribe((x) => {
      complete.eventId = x.EventId;
      complete.show = true;
    });
  }
}

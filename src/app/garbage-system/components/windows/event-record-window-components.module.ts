import { EventRecordWindowComponent } from './event-record-window/event-record-window.component';
import { EventRecordComparisonComponent } from './event-record-window/tab-items/event-record-comparison/event-record-comparison.component';
import { EventRecordCountComponent } from './event-record-window/tab-items/event-record-count/event-record-count.component';
import { EventRecordWindowDetailsComponent } from './event-record-window/tab-items/event-record-window-details/event-record-window-details.component';
import { EventRecordWindowListComponent } from './event-record-window/tab-items/event-record-window-list/event-record-window-list.component';

export const EventRecordWindowComponents = [
  EventRecordCountComponent,
  EventRecordComparisonComponent,
  EventRecordWindowComponent,
  EventRecordWindowListComponent,
  EventRecordWindowDetailsComponent,
];

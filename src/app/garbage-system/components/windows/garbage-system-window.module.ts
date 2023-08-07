import { CardRecordEpisodeComponent } from './card-record-episode/card-record-episode.component';
import { GARBAGE_SYSTEM_WINDOW_CHARTS_COMPONENTS } from './charts/garbage-system-window-charts.module';
import { DeviceListWindowComponent } from './device-list-window/device-list-window.component';
import { EventRecordWindowComponent } from './event-record-window/event-record-window.component';
import { EventRecordComparisonComponent } from './event-record-window/tab-items/event-record-comparison/event-record-comparison.component';
import { EventRecordCountComponent } from './event-record-window/tab-items/event-record-count/event-record-count.component';
import { GarbageDropStationWindowComponent } from './garbage-drop-station-window/garbage-drop-station-window.component';
import { GarbageDropStationWindowCountComponent } from './garbage-drop-station-window/tab-items/garbage-drop-station-window-count/garbage-drop-station-window-count.component';
import { GarbageFullStationWindowComponent } from './garbage-full-station-window/garbage-full-station-window.component';
import { GarbageStationWeightComponents } from './garbage-station-weight/garbage-station-weight-components';
import { GarbageStationWindowComponent } from './garbage-station-window/garbage-station-window.component';
import { GarbageStationCardRecordComponent } from './garbage-station-window/tab-items/garbage-station-card-record/garbage-station-card-record.component';
import { GarbageStationWindowDetailsComponent } from './garbage-station-window/tab-items/garbage-station-window-details/garbage-station-window-details.component';
import { GarbageStationWindowRecordComponent } from './garbage-station-window/tab-items/garbage-station-window-record/garbage-station-window-record.component';
import { MediaMultipleWindowComponent } from './media-multiple-window/media-multiple-window.component';

export const GARBAGE_SYSTEM_WINDOW_COMPONENTS = [
  MediaMultipleWindowComponent,
  EventRecordCountComponent,
  EventRecordComparisonComponent,
  EventRecordWindowComponent,
  DeviceListWindowComponent,

  GarbageFullStationWindowComponent,
  GarbageStationWindowDetailsComponent,
  GarbageStationWindowRecordComponent,
  GarbageStationCardRecordComponent,
  GarbageStationWindowComponent,

  ...GARBAGE_SYSTEM_WINDOW_CHARTS_COMPONENTS,

  GarbageDropStationWindowComponent,
  GarbageDropStationWindowCountComponent,

  CardRecordEpisodeComponent,

  ...GarbageStationWeightComponents,
];

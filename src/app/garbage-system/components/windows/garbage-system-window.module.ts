import { CardRecordEpisodeComponent } from './card-record-episode/card-record-episode.component';
import { GARBAGE_SYSTEM_WINDOW_CHARTS_COMPONENTS } from './charts/garbage-system-window-charts.module';
import { DeviceListWindowComponent } from './device-list-window/device-list-window.component';
import { EventRecordWindowComponents } from './event-record-window-components.module';
import { GarbageDropStationWindowCountComponent } from './garbage-drop-window/components/garbage-drop-window-count/garbage-drop-window-count.component';
import { GarbageDropStationWindowComponent } from './garbage-drop-window/garbage-drop-window.component';

import { GarbageDropStationWindowItemCountComponent } from './garbage-drop-window/tab-items/garbage-drop-window-item-count/garbage-drop-window-item-count.component';
import { GarbageDropStationWindowItemDetailsComponent } from './garbage-drop-window/tab-items/garbage-drop-window-item-details/garbage-drop-window-item-details.component';
import { GarbageDropStationWindowItemDurationComponent } from './garbage-drop-window/tab-items/garbage-drop-window-item-duration/garbage-drop-window-item-duration.component';
import { GarbageDropStationWindowItemRecordComponent } from './garbage-drop-window/tab-items/garbage-drop-window-item-record/garbage-drop-window-item-record.component';
import { GarbageDropStationWindowItemStationComponent } from './garbage-drop-window/tab-items/garbage-drop-window-item-station/garbage-drop-window-item-station.component';
import { GarbageDropStationWindowItemTaskComponent } from './garbage-drop-window/tab-items/garbage-drop-window-item-task/garbage-drop-window-item-task.component';

import { GarbageFullWindowComponent } from './garbage-full-window/garbage-full-window.component';
import { GARBAGE_SYSTEM_FULL_WINDOW_COMPONENTS } from './garbage-full-window/garbage-full-window.module';
import { GarbageStationWeightComponents } from './garbage-station-weight/garbage-station-weight-components';
import { GarbageStationWindowComponent } from './garbage-station-window/garbage-station-window.component';
import { GarbageStationCardRecordComponent } from './garbage-station-window/tab-items/garbage-station-card-record/garbage-station-card-record.component';
import { GarbageStationWindowDetailsComponent } from './garbage-station-window/tab-items/garbage-station-window-details/garbage-station-window-details.component';
import { GarbageStationWindowRecordComponent } from './garbage-station-window/tab-items/garbage-station-window-record/garbage-station-window-record.component';
import { GarbageStationWindowSewageComponent } from './garbage-station-window/tab-items/garbage-station-window-sewage/garbage-station-window-sewage.component';
import { MediaMultipleWindowComponent } from './media-multiple-window/media-multiple-window.component';

export const GARBAGE_SYSTEM_WINDOW_COMPONENTS = [
  ...EventRecordWindowComponents,
  MediaMultipleWindowComponent,
  DeviceListWindowComponent,

  GarbageFullWindowComponent,
  GarbageStationWindowDetailsComponent,
  GarbageStationWindowRecordComponent,
  GarbageStationWindowSewageComponent,
  GarbageStationCardRecordComponent,
  GarbageStationWindowComponent,

  ...GARBAGE_SYSTEM_WINDOW_CHARTS_COMPONENTS,
  ...GARBAGE_SYSTEM_FULL_WINDOW_COMPONENTS,

  GarbageDropStationWindowComponent,
  GarbageDropStationWindowCountComponent,
  GarbageDropStationWindowItemCountComponent,
  GarbageDropStationWindowItemDetailsComponent,
  GarbageDropStationWindowItemStationComponent,
  GarbageDropStationWindowItemRecordComponent,
  GarbageDropStationWindowItemDurationComponent,
  GarbageDropStationWindowItemTaskComponent,

  CardRecordEpisodeComponent,

  ...GarbageStationWeightComponents,
];

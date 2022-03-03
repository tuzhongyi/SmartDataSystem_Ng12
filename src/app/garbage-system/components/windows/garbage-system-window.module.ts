import { GARBAGE_SYSTEM_WINDOW_CHARTS_COMPONENTS } from './charts/garbage-system-window-charts.module';
import { DeviceListWindowComponent } from './device-list-window/device-list-window.component';
import { EventRecordWindowComponent } from './event-record-window/event-record-window.component';
import { GarbageDropStationWindowComponent } from './garbage-drop-station-window/garbage-drop-station-window.component';
import { GarbageFullStationWindowComponent } from './garbage-full-station-window/garbage-full-station-window.component';
import { GarbageStationWindowComponent } from './garbage-station-window/garbage-station-window.component';
import { MediaMultipleWindowComponent } from './media-multiple-window/media-multiple-window.component';

export const GARBAGE_SYSTEM_WINDOW_COMPONENTS = [
  MediaMultipleWindowComponent,
  EventRecordWindowComponent,
  DeviceListWindowComponent,
  GarbageDropStationWindowComponent,
  GarbageFullStationWindowComponent,
  GarbageStationWindowComponent,
  ...GARBAGE_SYSTEM_WINDOW_CHARTS_COMPONENTS,
];

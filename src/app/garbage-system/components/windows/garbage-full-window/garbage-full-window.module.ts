import { GarbageFullWindowComponent } from './garbage-full-window.component';
import { GarbageFullWindowCountComponent } from './tab-items/garbage-full-window-count/garbage-full-window-count.component';
import { GarbageFullWindowDetailsComponent } from './tab-items/garbage-full-window-details/garbage-full-window-details.component';
import { GarbageFullWindowRecordComponent } from './tab-items/garbage-full-window-record/garbage-full-window-record.component';
import { GarbageFullWindowStationComponent } from './tab-items/garbage-full-window-station/garbage-full-window-station.component';

export const GARBAGE_SYSTEM_FULL_WINDOW_COMPONENTS = [
  GarbageFullWindowComponent,
  GarbageFullWindowStationComponent,
  GarbageFullWindowRecordComponent,
  GarbageFullWindowDetailsComponent,
  GarbageFullWindowCountComponent,
];

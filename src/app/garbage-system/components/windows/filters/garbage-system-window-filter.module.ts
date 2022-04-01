import { DivisionFilterComponent } from './division-filter/division-filter.component';
import { DivisionStationTreeFilterComponent } from './division-station-tree-filter/division-station-tree-filter.component';
import { DivisionStationTreeMultFilterComponent } from './division-station-tree-mult-filter/division-station-tree-mult-filter.component';
import { DivisionTreeFilterComponent } from './division-tree-filter/division-tree-filter.component';
import { GarbageStationFilterComponent } from './garbage-station-filter/garbage-station-filter.component';

export const GARBAGE_SYSTEM_WINDOW_FILTER_COMPONENTS = [
  DivisionTreeFilterComponent,
  DivisionStationTreeFilterComponent,  
  DivisionStationTreeMultFilterComponent,
  DivisionFilterComponent,
  GarbageStationFilterComponent,
];

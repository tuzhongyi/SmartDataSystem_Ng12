import { AiopCameraTableComponent } from './aiop-camera-table/aiop-camera-table.component';
import { AiopGarbageCollectionMemberTableComponent } from './aiop-garbage-collection-member-table/aiop-garbage-collection-member-table.component';
import { AiopGarbageCollectionPointTableComponent } from './aiop-garbage-collection-point-table/aiop-garbage-collection-point-table.component';
import { DeviceListTableComponent } from './device-list-table/device-list-table.component';
import { EventRecordCountTableComponent } from './event-record-count-table/event-record-count-table.component';
import { EventRecordListComponent } from './event-record/event-record-list/event-record-list.component';
import { EventRecordTableComponent } from './event-record/event-record-table/event-record-table.component';

import { AIGarbageStationTablesComponents } from './ai-garbage-station-tables/ai-garbage-station-tables.module';
import { AiopGarbageCollectionPointTrashCanTableComponent } from './aiop-garbage-collection-point-trashcan-table/aiop-garbage-collection-point-trashcan-table.component';
import { AiopGarbageVehicleCameraTableComponent } from './aiop-garbage-vehicle-camera-table/aiop-garbage-vehicle-camera-table.component';
import { CardRecordTableComponent } from './card-record-table/card-record-table.component';
import { DaPuQiaoTableComponents } from './daqupiao/dapuqiao-tables-components';
import { GarbageDropRecordTableComponent } from './garbage-drop-record-table/garbage-drop-record-table.component';
import { GarbageDropRecordTaskTableComponent } from './garbage-drop-record-task-table/garbage-drop-record-task-table.component';
import { GarbageDropStationCountTableComponent } from './garbage-drop-station-count-table/garbage-drop-station-count-table.component';
import { GarbageDropStationTableComponent } from './garbage-drop-station-table/garbage-drop-station-table.component';
import { GarbageFullStationTableComponent } from './garbage-full-station-table/garbage-full-station-table.component';
import { GarbageStationCountTableComponent } from './garbage-station-count-table/garbage-station-count-table.component';
import { GarbageStationStatisticTableComponent } from './garbage-station-statistic-table/garbage-station-statistic-table.component';
import { GarbageStationTableComponent } from './garbage-station-table/garbage-station-table.component';
import { GarbageStationWeightTableComponent } from './garbage-station-weight-table/garbage-station-weight-table.component';
import { GarbageVehicleCameraTableComponent } from './garbage-vehicle-camera-table/garbage-vehicle-camera-table.component';

export const Table_COMPONENTS = [
  EventRecordTableComponent,
  EventRecordListComponent,
  DeviceListTableComponent,
  GarbageDropStationTableComponent,
  GarbageFullStationTableComponent,
  GarbageStationTableComponent,

  GarbageDropRecordTableComponent,
  GarbageDropRecordTaskTableComponent,

  GarbageStationStatisticTableComponent,
  EventRecordCountTableComponent,
  GarbageDropStationCountTableComponent,
  GarbageVehicleCameraTableComponent,
  AiopCameraTableComponent,

  AiopGarbageCollectionPointTableComponent,
  AiopGarbageCollectionMemberTableComponent,
  AiopGarbageCollectionPointTrashCanTableComponent,
  AiopGarbageVehicleCameraTableComponent,

  CardRecordTableComponent,

  GarbageStationWeightTableComponent,

  ...AIGarbageStationTablesComponents,

  GarbageStationCountTableComponent,

  ...DaPuQiaoTableComponents,
];

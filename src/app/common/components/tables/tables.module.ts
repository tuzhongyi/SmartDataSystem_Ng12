import { AIOPCameraTableComponent } from './aiop-camera-table/aiop-camera-table.component';
import { DeviceListTableComponent } from './device-list-table/device-list-table.component';
import { EventRecordCountTableComponent } from './event-record-count-table/event-record-count-table.component';
import { EventRecordListComponent } from './event-record/event-record-list/event-record-list.component';
import { EventRecordTableComponent } from './event-record/event-record-table/event-record-table.component';

import { AIGarbageStationTablesComponents } from './ai-garbage-station-tables/ai-garbage-station-tables.module';
import { AIOPGarbageCollectionMemberTableComponent } from './aiop-garbage-collection-member-table/aiop-garbage-collection-member-table.component';
import { AiopGarbageCollectionPointTableComponent as AIOPGarbageCollectionPointTableComponent } from './aiop-garbage-collection-point-table/aiop-garbage-collection-point-table.component';
import { AiopGarbageCollectionPointTrashCanTableComponent } from './aiop-garbage-collection-point-trashcan-table/aiop-garbage-collection-point-trashcan-table.component';
import { AIOPGarbageStationCamerasTableComponent } from './aiop-garbage-station-cameras-table/aiop-garbage-station-cameras-table.component';
import { AIOPGarbageStationTableComponent } from './aiop-garbage-station-table/aiop-garbage-station-table.component';
import { AiopGarbageVehicleCameraTableComponent as AIOPGarbageVehicleCameraTableComponent } from './aiop-garbage-vehicle-camera-table/aiop-garbage-vehicle-camera-table.component';
import { AIOPGarbageVehicleTableComponent } from './aiop-garbage-vehicle-table/aiop-garbage-vehicle-table.component';
import { AIOPRecordCameraEventTableComponent } from './aiop-record-camera-event-table/aiop-record-camera-event-table.component';
import { AIOPRecordResourceStatusOnlineTableComponent } from './aiop-record-resource-status-online-table/aiop-record-resource-status-online-table.component';
import { AIOPRoleTableComponent } from './aiop-role-table/aiop-role-table.component';
import { AIOPUserLogRecordTableComponent } from './aiop-user-log-record-table/aiop-user-log-record-table.component';
import { AIOPUserTableComponent } from './aiop-user-table/aiop-user-table.component';
import { AuditGarbageStationTableComponent } from './audit-garbage-station-table/audit-garbage-station-table.component';
import { AuditLogVideoTableComponent } from './audit-log-video-table/audit-log-video-table.component';
import { CardRecordTableComponent } from './card-record-table/card-record-table.component';
import { DaPuQiaoTableComponents } from './daqupiao/dapuqiao-tables-components';
import { EventRecordTableGarbageFullComponent } from './event-record/event-record-table-garbage-full/event-record-table-garbage-full.component';
import { EventRecordTableIllegalDropComponent } from './event-record/event-record-table-illegal-drop/event-record-table-illegal-drop.component';
import { EventRecordTableMixedIntoComponent } from './event-record/event-record-table-mixed-into/event-record-table-mixed-into.component';
import { EventRecordTableSewageComponent } from './event-record/event-record-table-sewage/event-record-table-sewage.component';
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
  EventRecordTableIllegalDropComponent,
  EventRecordTableMixedIntoComponent,
  EventRecordTableGarbageFullComponent,
  EventRecordTableSewageComponent,

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

  AIOPCameraTableComponent,
  AIOPGarbageStationCamerasTableComponent,
  AIOPGarbageStationTableComponent,

  CardRecordTableComponent,

  GarbageStationWeightTableComponent,

  ...AIGarbageStationTablesComponents,

  GarbageStationCountTableComponent,

  ...DaPuQiaoTableComponents,

  AIOPGarbageVehicleCameraTableComponent,
  AIOPGarbageVehicleTableComponent,
  AIOPGarbageCollectionPointTableComponent,
  AIOPGarbageCollectionMemberTableComponent,
  AiopGarbageCollectionPointTrashCanTableComponent,

  AIOPRoleTableComponent,
  AIOPUserTableComponent,
  AIOPUserLogRecordTableComponent,
  AIOPRecordResourceStatusOnlineTableComponent,
  AIOPRecordCameraEventTableComponent,
  AuditLogVideoTableComponent,
  AuditGarbageStationTableComponent,
];

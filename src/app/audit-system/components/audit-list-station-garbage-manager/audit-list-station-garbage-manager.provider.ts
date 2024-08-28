import { AuditListStationGarbageManagerDivisionController } from './controller/audit-list-station-garbage-manager-division.controller';
import { AuditListStationGarbageManagerWindows } from './controller/audit-list-station-garbage-manager-window.controller';
import { AuditListStationGarbageManagerController } from './controller/audit-list-station-garbage-manager.controller';

export const AuditListStationGarbageManagerProviders = [
  AuditListStationGarbageManagerDivisionController,
  AuditListStationGarbageManagerController,
  ...AuditListStationGarbageManagerWindows,
];

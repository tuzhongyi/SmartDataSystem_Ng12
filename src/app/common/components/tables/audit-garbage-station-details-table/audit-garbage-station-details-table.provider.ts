import { AuditGarbageStationDetailsTableConverter } from './audit-garbage-station-details-table.converter';
import { AuditGarbageStationDetailsTableConfigBusiness } from './business/audit-garbage-station-details-table-config.business';
import { AuditGarbageStationDetailsTableBusiness } from './business/audit-garbage-station-details-table.business';

export const AuditGarbageStationDetailsTableProviders = [
  AuditGarbageStationDetailsTableConverter,
  AuditGarbageStationDetailsTableBusiness,
  AuditGarbageStationDetailsTableConfigBusiness,
];

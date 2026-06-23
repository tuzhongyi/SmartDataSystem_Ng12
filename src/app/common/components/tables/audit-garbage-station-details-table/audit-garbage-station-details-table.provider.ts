import { AuditGarbageStationDetailsTableConverter } from './audit-garbage-station-details-table.converter';
import { AuditGarbageStationDetailsTableConfigBusiness } from './business/audit-garbage-station-details-table-config.business';
import { AuditGarbageStationDetailsTableDeviceBusiness } from './business/audit-garbage-station-details-table-device.business';
import { AuditGarbageStationDetailsTableDownloadBusiness } from './business/audit-garbage-station-details-table-download.business';
import { AuditGarbageStationDetailsTableStationBusiness } from './business/audit-garbage-station-details-table-station.business';
import { AuditGarbageStationDetailsTableBusiness } from './business/audit-garbage-station-details-table.business';

export const AuditGarbageStationDetailsTableProviders = [
  AuditGarbageStationDetailsTableConverter,
  AuditGarbageStationDetailsTableBusiness,
  AuditGarbageStationDetailsTableStationBusiness,
  AuditGarbageStationDetailsTableConfigBusiness,
  AuditGarbageStationDetailsTableDownloadBusiness,
  AuditGarbageStationDetailsTableDeviceBusiness,
];

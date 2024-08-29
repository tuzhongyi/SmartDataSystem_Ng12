import { AuditGarbageStationDetailsTableConverter } from '../audit-garbage-station-details-table/audit-garbage-station-details-table.converter';
import { AuditGarbageStationDetailsTableDownloadBusiness } from '../audit-garbage-station-details-table/business/audit-garbage-station-details-table-download.business';
import { AuditGarbageStationAbnormalTableConfigBusiness } from './business/audit-garbage-station-abnormal-table-config.business';
import { AuditGarbageStationAbnormalTableBusiness } from './business/audit-garbage-station-abnormal-table.business';

export const AuditGarbageStationAbnormalTableProviders = [
  AuditGarbageStationAbnormalTableConfigBusiness,
  AuditGarbageStationAbnormalTableBusiness,
  AuditGarbageStationDetailsTableConverter,
  AuditGarbageStationDetailsTableDownloadBusiness,
];

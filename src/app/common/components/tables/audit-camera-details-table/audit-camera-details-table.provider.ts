import { AuditCameraDetailsTableConverter } from './audit-camera-details-table.converter';
import { AuditCameraDetailsTableConfigBusiness } from './business/audit-camera-details-table-config.business';
import { AuditCameraDetailsTableBusiness } from './business/audit-camera-details-table.business';

export const AuditCameraDetailsTableProviders = [
  AuditCameraDetailsTableConverter,
  AuditCameraDetailsTableBusiness,
  AuditCameraDetailsTableConfigBusiness,
];

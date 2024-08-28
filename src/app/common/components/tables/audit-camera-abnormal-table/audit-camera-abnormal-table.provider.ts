import { AuditCameraDetailsTableConverter } from '../audit-camera-details-table/audit-camera-details-table.converter';
import { AuditCameraAbnormalTableConfigBusiness } from './business/audit-camera-abnormal-table-config.business';
import { AuditCameraAbnormalTableBusiness } from './business/audit-camera-abnormal-table.business';

export const AuditCameraAbnormalTableProviders = [
  AuditCameraAbnormalTableConfigBusiness,
  AuditCameraAbnormalTableBusiness,
  AuditCameraDetailsTableConverter,
];

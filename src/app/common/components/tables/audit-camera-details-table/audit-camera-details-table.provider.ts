import { AuditCameraDetailsTableConverter } from './audit-camera-details-table.converter';
import { AuditCameraDetailsTableCameraBusiness } from './business/audit-camera-details-table-camera.business';
import { AuditCameraDetailsTableConfigBusiness } from './business/audit-camera-details-table-config.business';
import { AuditCameraDetailsTableDownloadBusiness } from './business/audit-camera-details-table-download.business';
import { AuditCameraDetailsTableBusiness } from './business/audit-camera-details-table.business';

export const AuditCameraDetailsTableProviders = [
  AuditCameraDetailsTableConverter,
  AuditCameraDetailsTableBusiness,
  AuditCameraDetailsTableConfigBusiness,
  AuditCameraDetailsTableDownloadBusiness,
  AuditCameraDetailsTableCameraBusiness,
];

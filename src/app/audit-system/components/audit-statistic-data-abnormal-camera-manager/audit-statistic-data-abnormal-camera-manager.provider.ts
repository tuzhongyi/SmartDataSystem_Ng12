import { AuditStatisticDataAbnormalCameraManagerControllers } from './controllers/audit-statistic-data-abnormal-camera-manager.controller';
import { AuditStatisticDataAbnormalCameraManagerWindows } from './windows/audit-statistic-data-abnormal-camera-manager.window';

export const AuditStatisticDataAbnormalCameraManagerProviders = [
  ...AuditStatisticDataAbnormalCameraManagerControllers,
  ...AuditStatisticDataAbnormalCameraManagerWindows,
];

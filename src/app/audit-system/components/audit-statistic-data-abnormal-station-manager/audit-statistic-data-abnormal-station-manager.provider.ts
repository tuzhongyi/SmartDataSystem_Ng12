import { AuditStatisticDataAbnormalStationManagerControllers } from './controllers/audit-statistic-data-abnormal-station-manager.controller';
import { AuditStatisticDataAbnormalStationManagerWindows } from './windows/audit-statistic-data-abnormal-station-manager.window';

export const AuditStatisticDataAbnormalStationManagerProviders = [
  ...AuditStatisticDataAbnormalStationManagerControllers,
  ...AuditStatisticDataAbnormalStationManagerWindows,
];

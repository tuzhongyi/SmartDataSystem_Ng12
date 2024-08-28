import { AuditStatisticDataPlusTool } from './audit-statistic-data-plus.tool';
import { AuditStatisticDataBusiness } from './business/audit-statistic-data.business';
import { AuditStatisticDataControllers } from './controller/audit-statistic-data.controller';
import { AuditStatisticDataServices } from './service/audit-statistic-data.service';
import { AuditStatisticDataWindows } from './windows/audit-statistic-data.window';

export const AuditStatisticDataProviders = [
  AuditStatisticDataPlusTool,
  AuditStatisticDataBusiness,
  ...AuditStatisticDataServices,
  ...AuditStatisticDataWindows,
  ...AuditStatisticDataControllers,
];

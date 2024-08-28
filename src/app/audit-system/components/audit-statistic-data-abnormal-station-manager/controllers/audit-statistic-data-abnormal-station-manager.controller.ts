import { Injectable } from '@angular/core';
import { AuditStatisticDataAbnormalStationDivisionManager } from './audit-statistic-data-abnormal-station-manager-division.controller';

@Injectable()
export class AuditStatisticDataAbnormalStationManagerController {
  constructor(
    public division: AuditStatisticDataAbnormalStationDivisionManager
  ) {}
}

export const AuditStatisticDataAbnormalStationManagerControllers = [
  AuditStatisticDataAbnormalStationManagerController,
  AuditStatisticDataAbnormalStationDivisionManager,
];

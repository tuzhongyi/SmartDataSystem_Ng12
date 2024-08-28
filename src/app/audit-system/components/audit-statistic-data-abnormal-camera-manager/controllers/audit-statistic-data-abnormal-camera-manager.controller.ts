import { Injectable } from '@angular/core';
import { AuditStatisticDataAbnormalStationDivisionManager } from './audit-statistic-data-abnormal-camera-manager-division.controller';

@Injectable()
export class AuditStatisticDataAbnormalCameraManagerController {
  constructor(
    public division: AuditStatisticDataAbnormalStationDivisionManager
  ) {}
}

export const AuditStatisticDataAbnormalCameraManagerControllers = [
  AuditStatisticDataAbnormalCameraManagerController,
  AuditStatisticDataAbnormalStationDivisionManager,
];

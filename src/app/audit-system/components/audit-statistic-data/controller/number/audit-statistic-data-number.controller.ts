import { Injectable } from '@angular/core';
import { AuditStatisticDataNumberCameraAbnormalRecordController } from './camera/audit-statistic-data-number-camera-abnormal-record.controller';
import { AuditStatisticDataNumberCameraAbnormalController } from './camera/audit-statistic-data-number-camera-abnormal.controller';
import { AuditStatisticDataNumberCameraCountController } from './camera/audit-statistic-data-number-camera-count.controller';
import { AuditStatisticDataNumberCameraOfflineController } from './camera/audit-statistic-data-number-camera-offline.controller';
import { AuditStatisticDataNumberCameraController } from './camera/audit-statistic-data-number-camera.controller';
import { AuditStatisticDataNumberStationCountController } from './station/audit-statistic-data-number-station-count.controller';
import { AuditStatisticDataNumberStationOfflineDoorController } from './station/audit-statistic-data-number-station-offline-door.controller';
import { AuditStatisticDataNumberStationOfflineGCHAController } from './station/audit-statistic-data-number-station-offline-gcha.controller';
import { AuditStatisticDataNumberStationOfflineNBController } from './station/audit-statistic-data-number-station-offline-nb.controller';
import { AuditStatisticDataNumberStationController } from './station/audit-statistic-data-number-station.controller';

@Injectable()
export class AuditStatisticDataNumberController {
  constructor(
    public station: AuditStatisticDataNumberStationController,
    public camera: AuditStatisticDataNumberCameraController
  ) {}

  load(divisionId?: string, hours?: number) {
    this.station.load(divisionId, hours);
    this.camera.load(divisionId, hours);
  }
}
export const AuditStatisticDataNumberControllers = [
  AuditStatisticDataNumberController,

  AuditStatisticDataNumberStationController,
  AuditStatisticDataNumberStationCountController,
  AuditStatisticDataNumberStationOfflineDoorController,
  AuditStatisticDataNumberStationOfflineGCHAController,
  AuditStatisticDataNumberStationOfflineNBController,

  AuditStatisticDataNumberCameraController,
  AuditStatisticDataNumberCameraCountController,
  AuditStatisticDataNumberCameraOfflineController,
  AuditStatisticDataNumberCameraAbnormalController,
  AuditStatisticDataNumberCameraAbnormalRecordController,
];

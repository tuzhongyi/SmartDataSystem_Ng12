import { Injectable } from '@angular/core';
import { AuditStatisticDataStatisticCameraController } from './audit-statistic-data-statistic-camera.controller';
import { AuditStatisticDataStatisticStationController } from './audit-statistic-data-statistic-station.controller';

@Injectable()
export class AuditStatisticDataStatisticController {
  constructor(
    public station: AuditStatisticDataStatisticStationController,
    public camera: AuditStatisticDataStatisticCameraController
  ) {}

  load(divisionId?: string, hours?: number) {
    this.station.load(divisionId, hours);
    this.camera.load(divisionId, hours);
  }
}
export const AuditStatisticDataStatisticControllers = [
  AuditStatisticDataStatisticController,
  AuditStatisticDataStatisticStationController,
  AuditStatisticDataStatisticCameraController,
];

import { Injectable } from '@angular/core';
import { AuditStatisticDataAbnormalCameraWindow } from './audit-statistic-data-abnormal-camera.window';
import { AuditStatisticDataAbnormalStationWindow } from './audit-statistic-data-abnormal-station.window';

@Injectable()
export class AuditStatisticDataAbnormalWindow {
  constructor(
    public station: AuditStatisticDataAbnormalStationWindow,
    public camera: AuditStatisticDataAbnormalCameraWindow
  ) {}
}

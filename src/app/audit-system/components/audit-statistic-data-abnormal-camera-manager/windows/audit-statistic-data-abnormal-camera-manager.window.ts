import { Injectable } from '@angular/core';
import { AuditStatisticDataAbnormalCameraManagerVideoWindow } from './audit-statistic-data-abnormal-camera-manager-video.window';

@Injectable()
export class AuditStatisticDataAbnormalCameraManagerWindow {
  constructor(
    public video: AuditStatisticDataAbnormalCameraManagerVideoWindow
  ) {}
}
export const AuditStatisticDataAbnormalCameraManagerWindows = [
  AuditStatisticDataAbnormalCameraManagerWindow,
  AuditStatisticDataAbnormalCameraManagerVideoWindow,
];

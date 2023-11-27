import { Injectable } from '@angular/core';
import { AuditStatisticDataDeviceWindow } from './audit-statistic-data-device.window';
import { AuditStatisticDataImageWindow } from './audit-statistic-data-image.window';
import { AuditStatisticDataStationWindow } from './audit-statistic-data-station.window';
import { AuditStatisticDataVideoWindow } from './audit-statistic-data-video.window';

@Injectable()
export class AuditStatisticDataWindow {
  constructor(
    public station: AuditStatisticDataStationWindow,
    public device: AuditStatisticDataDeviceWindow,
    public image: AuditStatisticDataImageWindow,
    public video: AuditStatisticDataVideoWindow
  ) {}
}

export const AuditStatisticDataWindows = [
  AuditStatisticDataWindow,
  AuditStatisticDataStationWindow,
  AuditStatisticDataDeviceWindow,
  AuditStatisticDataImageWindow,
  AuditStatisticDataVideoWindow,
];

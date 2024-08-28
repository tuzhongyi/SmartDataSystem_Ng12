import { Injectable } from '@angular/core';
import { AuditStatisticDataAbnormalCameraWindow } from './audit-statistic-data-abnormal-camera.window';
import { AuditStatisticDataAbnormalStationWindow } from './audit-statistic-data-abnormal-station.window';
import { AuditStatisticDataAbnormalWindow } from './audit-statistic-data-abnormal.window';
import { AuditStatisticDataDetailsStationWindow } from './audit-statistic-data-details-station.window';
import { AuditStatisticDataDetailsWindow } from './audit-statistic-data-details.window';
import { AuditStatisticDataDeviceWindow } from './audit-statistic-data-device.window';
import { AuditStatisticDataDropWindowWindow } from './audit-statistic-data-drop-window.window';
import { AuditStatisticDataImageWindow } from './audit-statistic-data-image.window';
import { AuditStatisticDataStationWindow } from './audit-statistic-data-station.window';
import { AuditStatisticDataVideoWindow } from './audit-statistic-data-video.window';

@Injectable()
export class AuditStatisticDataWindow {
  constructor(
    public station: AuditStatisticDataStationWindow,
    public device: AuditStatisticDataDeviceWindow,
    public image: AuditStatisticDataImageWindow,
    public video: AuditStatisticDataVideoWindow,
    public details: AuditStatisticDataDetailsWindow,
    public abnormal: AuditStatisticDataAbnormalWindow,
    public dropwindow: AuditStatisticDataDropWindowWindow
  ) {}
}

export const AuditStatisticDataWindows = [
  AuditStatisticDataWindow,
  AuditStatisticDataStationWindow,
  AuditStatisticDataDeviceWindow,
  AuditStatisticDataImageWindow,
  AuditStatisticDataVideoWindow,
  AuditStatisticDataDetailsWindow,
  AuditStatisticDataDetailsStationWindow,

  AuditStatisticDataAbnormalStationWindow,
  AuditStatisticDataAbnormalCameraWindow,
  AuditStatisticDataAbnormalWindow,
  AuditStatisticDataDropWindowWindow,
];

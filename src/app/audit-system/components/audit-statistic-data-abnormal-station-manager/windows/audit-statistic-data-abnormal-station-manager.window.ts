import { Injectable } from '@angular/core';
import { AuditStatisticDataAbnormalStationManagerCommandWindow } from './audit-statistic-data-abnormal-station-manager-command.window';
import { AuditStatisticDataAbnormalStationManagerConstructionWindow } from './audit-statistic-data-abnormal-station-manager-construction.window';
import { AuditStatisticDataAbnormalStationManagerScheduleWindow } from './audit-statistic-data-abnormal-station-manager-schedule.window';
import { AuditStatisticDataAbnormalStationManagerStatusWindow } from './audit-statistic-data-abnormal-station-manager-status.window';
import { AuditStatisticDataAbnormalStationManagerVideoWindow } from './audit-statistic-data-abnormal-station-manager-video.window';

@Injectable()
export class AuditStatisticDataAbnormalStationManagerWindow {
  constructor(
    public command: AuditStatisticDataAbnormalStationManagerCommandWindow,
    public construction: AuditStatisticDataAbnormalStationManagerConstructionWindow,
    public status: AuditStatisticDataAbnormalStationManagerStatusWindow,
    public schedule: AuditStatisticDataAbnormalStationManagerScheduleWindow,
    public video: AuditStatisticDataAbnormalStationManagerVideoWindow
  ) {}
}
export const AuditStatisticDataAbnormalStationManagerWindows = [
  AuditStatisticDataAbnormalStationManagerWindow,
  AuditStatisticDataAbnormalStationManagerCommandWindow,
  AuditStatisticDataAbnormalStationManagerConstructionWindow,
  AuditStatisticDataAbnormalStationManagerStatusWindow,
  AuditStatisticDataAbnormalStationManagerScheduleWindow,
  AuditStatisticDataAbnormalStationManagerVideoWindow,
];

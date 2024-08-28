import { Injectable } from '@angular/core';
import { AuditStatisticDataDetailsStationWindow } from './audit-statistic-data-details-station.window';

@Injectable()
export class AuditStatisticDataDetailsWindow {
  constructor(public station: AuditStatisticDataDetailsStationWindow) {}
}

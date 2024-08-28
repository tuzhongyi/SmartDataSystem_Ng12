import { Injectable } from '@angular/core';
import { AuditStatisticDataNumberColor } from 'src/app/audit-system/components/audit-statistic-data-number/audit-statistic-data-number.model';

@Injectable()
export class AuditStatisticDataNumberStationOfflineDoorController {
  title = '24小时内感应门离线数量';
  value = 0;
  color = AuditStatisticDataNumberColor.red;
  setTitle(hour: number) {
    this.title = `${hour}小时内智能设备离线数量`;
  }
}

import { Injectable } from '@angular/core';
import { AuditStatisticDataNumberColor } from 'src/app/audit-system/components/audit-statistic-data-number/audit-statistic-data-number.model';

@Injectable()
export class AuditStatisticDataNumberStationCountController {
  title = '24小时内投放点异常总数';
  value = 0;
  color = AuditStatisticDataNumberColor.blue;
  setTitle(hour: number) {
    this.title = `${hour}小时内投放点异常总数`;
  }
}

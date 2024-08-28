import { Injectable } from '@angular/core';
import { AuditStatisticDataNumberColor } from 'src/app/audit-system/components/audit-statistic-data-number/audit-statistic-data-number.model';

@Injectable()
export class AuditStatisticDataNumberCameraAbnormalRecordController {
  title = '24小时内摄像机录像故障数量';
  value = 0;
  color = AuditStatisticDataNumberColor.orange;
  setTitle(hour: number) {
    this.title = `${hour}小时内摄像机录像故障数量`;
  }
}

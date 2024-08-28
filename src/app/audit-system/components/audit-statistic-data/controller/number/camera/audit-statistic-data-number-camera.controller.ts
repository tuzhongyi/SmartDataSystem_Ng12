import { Injectable } from '@angular/core';
import { AuditStatisticDataBusiness } from '../../../business/audit-statistic-data.business';
import { AuditStatisticDataNumberCameraAbnormalRecordController } from './audit-statistic-data-number-camera-abnormal-record.controller';
import { AuditStatisticDataNumberCameraAbnormalController } from './audit-statistic-data-number-camera-abnormal.controller';
import { AuditStatisticDataNumberCameraCountController } from './audit-statistic-data-number-camera-count.controller';
import { AuditStatisticDataNumberCameraOfflineController } from './audit-statistic-data-number-camera-offline.controller';

@Injectable()
export class AuditStatisticDataNumberCameraController {
  constructor(
    public count: AuditStatisticDataNumberCameraCountController,
    public offline: AuditStatisticDataNumberCameraOfflineController,
    public abnormal: AuditStatisticDataNumberCameraAbnormalController,
    public record: AuditStatisticDataNumberCameraAbnormalRecordController,
    private business: AuditStatisticDataBusiness
  ) {}

  load(divisionId?: string, hours?: number) {
    this.business.abnomal.camera(divisionId, hours).then((data) => {
      this.count.value =
        data.CameraAbnormalNumber +
        data.CameraOfflineNumber +
        data.CameraRecordAbnormalNumber;
      this.offline.value = data.CameraOfflineNumber;
      this.abnormal.value = data.CameraAbnormalNumber;
      this.record.value = data.CameraRecordAbnormalNumber;

      this.setTitle(hours ?? 72);
    });
  }

  private setTitle(hours: number) {
    this.count.setTitle(hours);
    this.offline.setTitle(hours);
    this.abnormal.setTitle(hours);
    this.record.setTitle(hours);
  }
}

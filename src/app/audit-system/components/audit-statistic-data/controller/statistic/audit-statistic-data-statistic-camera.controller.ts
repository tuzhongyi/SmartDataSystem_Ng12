import { Injectable } from '@angular/core';
import { CameraAbnormalStatistic } from 'src/app/network/model/garbage-station/abnormal/camera-abnormal-statistic.model';
import { AuditStatisticDataBusiness } from '../../business/audit-statistic-data.business';

@Injectable()
export class AuditStatisticDataStatisticCameraController {
  constructor(private business: AuditStatisticDataBusiness) {}

  data?: CameraAbnormalStatistic;

  load(divisionId?: string, hours?: number) {
    this.business.abnomal.camera(divisionId, hours).then((data) => {
      this.data = data;
    });
  }
}

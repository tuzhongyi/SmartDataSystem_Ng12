import { Injectable } from '@angular/core';
import { DivisionNumberStatistic } from 'src/app/network/model/garbage-station/division-number-statistic.model';
import { AuditStatisticDataCountDeviceData } from './audit-statistic-data-count-device.model';

@Injectable()
export class AuditStatisticDataCountDeviceBusiness {
  constructor() {}
  async load(
    data: DivisionNumberStatistic
  ): Promise<AuditStatisticDataCountDeviceData> {
    let model = this.convert(data);
    return model;
  }

  private convert(source: DivisionNumberStatistic) {
    let data = new AuditStatisticDataCountDeviceData();
    data.all = source.CameraNumber;
    data.offline = source.OfflineCameraNumber;
    data.online = data.all - data.offline;
    return data;
  }
}

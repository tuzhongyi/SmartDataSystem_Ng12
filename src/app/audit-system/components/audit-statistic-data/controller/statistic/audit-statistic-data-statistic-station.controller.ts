import { Injectable } from '@angular/core';
import { GarbageStationAbnormalStatistic } from 'src/app/network/model/garbage-station/abnormal/garbage-station-abnormal-statistic.model';
import { AuditStatisticDataBusiness } from '../../business/audit-statistic-data.business';

@Injectable()
export class AuditStatisticDataStatisticStationController {
  constructor(private business: AuditStatisticDataBusiness) {}

  data?: GarbageStationAbnormalStatistic;

  load(divisionId?: string, hours?: number) {
    this.business.abnomal.station(divisionId, hours).then((data) => {
      this.data = data;
    });
  }
}

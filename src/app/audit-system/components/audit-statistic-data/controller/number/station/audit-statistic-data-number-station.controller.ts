import { Injectable } from '@angular/core';
import { AuditStatisticDataBusiness } from '../../../business/audit-statistic-data.business';
import { AuditStatisticDataNumberStationCountController } from './audit-statistic-data-number-station-count.controller';
import { AuditStatisticDataNumberStationOfflineDoorController } from './audit-statistic-data-number-station-offline-door.controller';
import { AuditStatisticDataNumberStationOfflineGCHAController } from './audit-statistic-data-number-station-offline-gcha.controller';
import { AuditStatisticDataNumberStationOfflineNBController } from './audit-statistic-data-number-station-offline-nb.controller';

@Injectable()
export class AuditStatisticDataNumberStationController {
  constructor(
    public count: AuditStatisticDataNumberStationCountController,
    public door: AuditStatisticDataNumberStationOfflineDoorController,
    public gcha: AuditStatisticDataNumberStationOfflineGCHAController,
    public nb: AuditStatisticDataNumberStationOfflineNBController,
    private business: AuditStatisticDataBusiness
  ) {}

  load(divisionId?: string, hours?: number) {
    this.business.abnomal.station(divisionId, hours).then((data) => {
      this.count.value =
        data.DoorOfflineNumber + data.GCHAOfflineNumber + data.NBOfflineNumber;
      this.door.value = data.DoorOfflineNumber;
      this.gcha.value = data.GCHAOfflineNumber;
      this.nb.value = data.NBOfflineNumber;
      this.setTitle(hours ?? 72);
    });
  }

  private setTitle(hours: number) {
    this.count.setTitle(hours);
    this.door.setTitle(hours);
    this.gcha.setTitle(hours);
    this.nb.setTitle(hours);
  }
}

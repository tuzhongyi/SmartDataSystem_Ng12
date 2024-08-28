import { Injectable } from '@angular/core';
import { AuditGarbageStationDetailsTableConfig } from 'src/app/common/components/tables/audit-garbage-station-details-table/audit-garbage-station-details-table.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
@Injectable()
export class AuditListStationGarbageManagerConfigWindow extends WindowViewModel {
  clear(): void {}
  style = {
    width: '50%',
    height: 'auto',
  };
  model = new AuditGarbageStationDetailsTableConfig();
}

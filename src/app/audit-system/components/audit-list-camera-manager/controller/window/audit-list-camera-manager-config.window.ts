import { Injectable } from '@angular/core';
import { AuditCameraDetailsTableConfig } from 'src/app/common/components/tables/audit-camera-details-table/audit-camera-details-table.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';

@Injectable()
export class AuditListCameraManagerConfigWindow extends WindowViewModel {
  constructor() {
    super();
  }
  style = {
    width: '50%',
    height: 'auto',
  };

  model = new AuditCameraDetailsTableConfig();
}

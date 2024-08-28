import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
@Injectable()
export class AuditListStationGarbageManagerEventDisabledsWindow extends WindowViewModel {
  style = {
    width: '450px',
    height: 'auto',
    minHeight: '300px',
  };
  model?: GarbageStation;
}

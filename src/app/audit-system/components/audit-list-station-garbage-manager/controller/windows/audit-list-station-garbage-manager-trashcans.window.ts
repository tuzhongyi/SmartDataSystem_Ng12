import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
@Injectable()
export class AuditListStationGarbageManagerTrashcansWindow extends WindowViewModel {
  style = {
    width: '838px',
    height: '560px',
  };
  model?: GarbageStation;
}

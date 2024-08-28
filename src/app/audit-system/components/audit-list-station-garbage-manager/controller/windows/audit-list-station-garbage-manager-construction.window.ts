import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
@Injectable()
export class AuditListStationGarbageManagerConstructionWindow extends WindowViewModel {
  clear(): void {
    this.model = undefined;
  }
  style = {
    width: '464px',
    height: 'auto',
  };
  model?: GarbageStation;
}

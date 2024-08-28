import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';

@Injectable()
export class AuditStatisticDataAbnormalStationManagerCommandWindow extends WindowViewModel {
  clear(): void {
    this.model = undefined;
  }
  style = {
    width: 'auto',
    height: 'auto',
  };
  model?: GarbageStation;
}

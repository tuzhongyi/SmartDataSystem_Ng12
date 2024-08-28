import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { GarbageStationAbnormalType } from 'src/app/enum/garbage-station-abnormal-type.enum';

@Injectable()
export class AuditStatisticDataDetailsStationWindow extends WindowViewModel {
  style = {
    width: '80%',
    height: '80%',
  };

  config = false;
  type?: GarbageStationAbnormalType;
}

import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { GarbageStationAbnormalType } from 'src/app/enum/garbage-station-abnormal-type.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { AuditStatisticDataDropWindowWindow } from './audit-statistic-data-drop-window.window';

@Injectable()
export class AuditStatisticDataAbnormalStationWindow extends WindowViewModel {
  constructor(private window: AuditStatisticDataDropWindowWindow) {
    super();
  }
  style = {
    width: '80%',
    height: '80%',
  };

  divisionId?: string;
  hour = 0;
  type?: GarbageStationAbnormalType;

  ondropwindows(data: GarbageStation) {
    this.window.model = data;
    this.window.show = true;
  }
}

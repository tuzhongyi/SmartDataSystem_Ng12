import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { MediaMultipleStatisticWindowArgs } from 'src/app/garbage-system/components/windows/media-multiple-statistic-window/media-multiple-statistic-window.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';

@Injectable()
export class AuditStatisticDataAbnormalStationManagerVideoWindow extends WindowViewModel {
  style = {
    width: '80%',
    height: '80%',
    padding: '10px 20px',
  };
  fullplay = true;
  args?: MediaMultipleStatisticWindowArgs;
  date?: Date;
  title = '';

  open(data: GarbageStation) {
    this.title = data.Name;
    let args = new MediaMultipleStatisticWindowArgs();
    args.stationId = data.Id;
    this.args = args;
    this.show = true;
  }
}

import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { MediaMultipleStatisticWindowArgs } from 'src/app/garbage-system/components/windows/media-multiple-statistic-window/media-multiple-statistic-window.model';

@Injectable()
export class AuditStatisticEventMediaMultipleWindow extends WindowViewModel {
  style = {
    width: '64%',
    height: '64%',
    top: '56%',
    padding: '10px 20px',
  };
  fullplay = true;
  args?: MediaMultipleStatisticWindowArgs;
}

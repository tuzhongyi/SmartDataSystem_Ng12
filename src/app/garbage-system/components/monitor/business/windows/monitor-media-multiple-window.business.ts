import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { MediaMultipleWindowArgs } from '../../../windows/media-multiple-window/media-multiple-window.model';

@Injectable()
export class MonitorMediaMultipleWindowBusiness extends WindowViewModel {
  style = {
    width: '64%',
    height: '64%',
    top: '56%',
    padding: '10px 20px',
  };
  fullplay = true;
  args?: MediaMultipleWindowArgs;
  date?: Date;
}

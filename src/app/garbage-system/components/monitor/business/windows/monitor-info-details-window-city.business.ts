import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';

@Injectable()
export class MonitorInfoDetailsWindowCityBusiness extends WindowViewModel {
  style = {
    width: '70%',
    height: '80%',
    zIndex: 9001,
  };

  divisionId?: string;
}

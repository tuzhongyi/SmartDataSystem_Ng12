import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';

@Injectable()
export class GarbageStationInfoWindowBusiness extends WindowViewModel {
  style = {
    height: '83.5%',
    transform: 'translate(-50%, -44.5%)',
  };
}

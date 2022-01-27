import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';

@Injectable()
export class GarbageStationDropWindowBusiness extends WindowViewModel {
  constructor() {
    super();
  }
  divisionId?: string;

  style = {
    height: '83.5%',
    transform: 'translate(-50%, -44.5%)',
  };
}

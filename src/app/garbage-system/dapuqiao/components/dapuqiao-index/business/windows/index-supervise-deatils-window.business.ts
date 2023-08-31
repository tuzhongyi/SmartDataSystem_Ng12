import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';

@Injectable()
export class IndexSuperviseDetailWindowBusiness extends WindowViewModel {
  constructor() {
    super();
  }

  eventId?: string;
  style = {
    width: '60%',
    height: '60%',
    top: '56%',
    padding: '15px 20px',
  };
  onclose() {
    this.show = false;
  }
}

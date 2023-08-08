import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { PatrolControlConfig } from '../../patrol-control/patrol-control.model';

@Injectable()
export class MonitorPatrolControlBusiness extends WindowViewModel {
  fullscreen = false;
  constructor() {
    super();
  }

  config = new PatrolControlConfig();

  onclose() {
    this.show = false;
    this.fullscreen = false;
  }

  onfullscreen() {
    this.fullscreen = !this.fullscreen;
  }
}

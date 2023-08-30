import { Injectable } from '@angular/core';
import { StationState } from 'src/app/enum/station-state.enum';
import { WindowBussiness } from './window/index-window.business';

@Injectable()
export class ElectricBikeIndexDeviceStatisticBusiness {
  constructor(private window: WindowBussiness) {}

  onstatus(state?: StationState) {
    this.window.station.state = state;
    this.window.station.show = true;
  }
}

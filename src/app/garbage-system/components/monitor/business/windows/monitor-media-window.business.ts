import { Injectable } from '@angular/core';
import { MonitorMediaMultipleWindowBusiness } from './monitor-media-multiple-window.business';
import { MonitorMediaSingleWindowBusiness } from './monitor-media-single-window.business';

@Injectable()
export class MonitorMediaWindowBusiness {
  constructor(
    public single: MonitorMediaSingleWindowBusiness,
    public multiple: MonitorMediaMultipleWindowBusiness
  ) {}
}

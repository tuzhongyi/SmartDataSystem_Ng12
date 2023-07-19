import { Injectable } from '@angular/core';
import { MonitorImageArrayWindowBusiness } from './monitor-image-array-window.business';
import { MonitorImagePageWindowBusiness } from './monitor-image-page-window.business';

@Injectable()
export class MonitorImageWindowBusiness {
  constructor(
    public page: MonitorImagePageWindowBusiness,
    public array: MonitorImageArrayWindowBusiness
  ) {}
}

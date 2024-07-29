import { Injectable } from '@angular/core';
import { MonitorInfoDetailsWindowCityBusiness } from './monitor-info-details-window-city.business';
import { MonitorInfoDetailsWindowCommitteesBusiness } from './monitor-info-details-window-committees.business';
import { MonitorInfoDetailsWindowCountyBusiness } from './monitor-info-details-window-county.business';

@Injectable()
export class MonitorInfoDetailsWindowBusiness {
  constructor(
    public county: MonitorInfoDetailsWindowCountyBusiness,
    public committees: MonitorInfoDetailsWindowCommitteesBusiness,
    public city: MonitorInfoDetailsWindowCityBusiness
  ) {}

  close() {
    this.county.show = false;
    this.committees.show = false;
    this.city.show = false;
  }
}

export const MonitorInfoDetailsWindowProviders = [
  MonitorInfoDetailsWindowCountyBusiness,
  MonitorInfoDetailsWindowCommitteesBusiness,
  MonitorInfoDetailsWindowCityBusiness,
  MonitorInfoDetailsWindowBusiness,
];

import { Injectable } from '@angular/core';
import { AMapPointPlugAceBusiness } from './amap-point-plug-ace.business';
import { AMapPointPlugBatteryBusiness } from './amap-point-plug-battery.business';
import { AMapClient } from './amap.client';

@Injectable()
export class AMapPointPlugBusiness {
  constructor(
    public ace: AMapPointPlugAceBusiness,
    public battery: AMapPointPlugBatteryBusiness,
    private amap: AMapClient
  ) {}
}

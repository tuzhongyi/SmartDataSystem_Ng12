import { Injectable } from '@angular/core';
import { DeployAMapBusiness } from './amap/deploy-amap.business';
import { DeployMapStationBusiness } from './deploy-map-station.business';

@Injectable()
export class DeployMapBusiness {
  constructor(
    public station: DeployMapStationBusiness,
    public amap: DeployAMapBusiness
  ) {}
}

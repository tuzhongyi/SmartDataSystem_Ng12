import { Injectable } from '@angular/core';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { DivisionTreeService } from '../service/division-tree.service';
import { DivisionTreeCityBusiness } from './division-tree-city.business';
import { DivisionTreeCommitteesBusiness } from './division-tree-committees.business';
import { DivisionTreeCountyBusiness } from './division-tree-county.business';
import { DivisionTreeStationBusiness } from './division-tree-station.business';

@Injectable()
export class DivisionTreeBusinessFactory {
  constructor(service: DivisionTreeService) {
    this.city = new DivisionTreeCityBusiness(service);
    this.county = new DivisionTreeCountyBusiness(service);
    this.committees = new DivisionTreeCommitteesBusiness(service);
    this.station = new DivisionTreeStationBusiness(service);
  }

  private city: DivisionTreeCityBusiness;
  private county: DivisionTreeCountyBusiness;
  private committees: DivisionTreeCommitteesBusiness;
  private station: DivisionTreeStationBusiness;

  create(type?: DivisionType) {
    switch (type) {
      case DivisionType.County:
        return this.county;
      case DivisionType.Committees:
        return this.committees;
      case DivisionType.City:
      case undefined:
        return this.city;
      case DivisionType.None:
        return this.station;
      default:
        throw new Error('DivisionType not found');
    }
  }
}

import { Injectable } from '@angular/core';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { DivisionTreeCityService } from './division-tree-city.service';
import { DivisionTreeCommitteesService } from './division-tree-committees.service';
import { DivisionTreeCountyService } from './division-tree-county.service';
import { DivisionTreeStationService } from './division-tree-station.service';

@Injectable()
export class DivisionTreeService {
  constructor(
    public committees: DivisionTreeCommitteesService,
    public county: DivisionTreeCountyService,
    public city: DivisionTreeCityService,
    public station: DivisionTreeStationService,
    private service: DivisionRequestService
  ) {}

  children(parentId: string) {
    let params = new GetDivisionsParams();
    params.ParentId = parentId;
    return this.service.cache.all(params);
  }
  get(id: string) {
    return this.service.cache.get(id);
  }
}

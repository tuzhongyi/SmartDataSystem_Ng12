import { Injectable } from '@angular/core';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import {
  GetDivisionsParams,
  GetDivisionTreeParams,
} from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class DivisionTreeService {
  constructor(
    division: DivisionRequestService,
    station: GarbageStationRequestService
  ) {
    this.division = new TreeDivisionService(division);
    this.station = new TreeStationService(station);
  }

  division: TreeDivisionService;
  station: TreeStationService;
}

class TreeDivisionService {
  constructor(private service: DivisionRequestService) {}
  async list(type: DivisionType, parentId?: string) {
    let params = new GetDivisionsParams();
    params.DivisionType = type;
    if (parentId) params.ParentId = parentId;
    let res = await this.service.cache.list(params);
    return res.Data;
  }

  get(id: string) {
    return this.service.cache.get(id);
  }

  async ancestor(division: Division) {
    let res: Division[] = [];

    while (division.ParentId) {
      let d = await this.get(division.ParentId);
      res.push(d);
      division = d;
    }

    return res;
  }
  async search(condition: string) {
    let params = new GetDivisionTreeParams();
    params.Name = condition;
    let res = await this.service.tree(params);
    return res.Nodes;
  }
}

class TreeStationService {
  constructor(private service: GarbageStationRequestService) {}

  async list(divisionId?: string) {
    let params = new GetGarbageStationsParams();
    if (divisionId) params.DivisionId = divisionId;
    let res = await this.service.cache.list(params);
    return res.Data;
  }
  async search(condition: string) {
    let params = new GetGarbageStationsParams();
    params.Name = condition;
    let res = await this.service.cache.list(params);

    return res.Data;
  }
}

import { Injectable } from '@angular/core';
import { ArrayTool } from 'src/app/common/tools/array-tool/array.tool';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';

@Injectable()
export class DivisionTreeCityService {
  constructor(private service: DivisionRequestService) {}
  async list(parentId?: string) {
    let params = new GetDivisionsParams();
    params.DivisionType = DivisionType.City;
    if (parentId) params.ParentId = parentId;
    let res = await this.service.cache.list(params);
    return res.Data;
  }

  array(divisionIds: string[]) {
    let params = new GetDivisionsParams();
    params.Ids = divisionIds;
    return this.service.cache.all(params);
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
  async search(condition: string, ids?: string[]) {
    let params = new GetDivisionsParams();
    params.Name = condition;
    params.DivisionType = DivisionType.City;
    let divisions = await this.service.cache.all(params);

    if (ids && ids.length > 0) {
      let divisionIds = divisions.map((x) => x.Id);
      let _ids = [...ids, ...divisionIds];
      _ids = ArrayTool.distinct(_ids, false);
      params = new GetDivisionsParams();
      params.Ids = _ids;
      let res = await this.service.cache.all(params);
      divisions = [...divisions, ...res];
    }
    return divisions;
  }
}

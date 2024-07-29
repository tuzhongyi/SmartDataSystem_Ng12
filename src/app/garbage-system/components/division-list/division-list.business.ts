import { Injectable } from '@angular/core';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import {
  GetDivisionStatisticNumbersParams,
  GetDivisionsParams,
} from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { DivisionListModel } from './division-list.model';

@Injectable()
export class DivisionListBusiness {
  constructor(private service: DivisionRequestService) {}

  async load(divisionId: string) {
    let model = new DivisionListModel();
    model.current = await this.get(divisionId);
    model.children = this.children(divisionId);

    return model;
  }

  async get(id: string) {
    return this.service.cache.get(id);
  }

  /**获得直接子元素 */
  async children(id: string) {
    let params = new GetDivisionsParams();
    params.ParentId = id;
    let paged = await this.service.cache.list(params);
    let ids = paged.Data.map((x) => x.Id);
    return this.statistic(ids);
  }

  async statistic(ids: string[]) {
    let params = new GetDivisionStatisticNumbersParams();
    params.Ids = ids;
    let paged = await this.service.statistic.number.cache.list(params);
    let data = paged.Data.sort((a, b) => {
      return (
        LocaleCompare.compare(!!b.StationNumber, !!a.StationNumber) ||
        LocaleCompare.compare(a.Name, b.Name)
      );
    });
    return data;
  }
}

/*
 * @Author: pmx
 * @Date: 2021-10-14 15:59:34
 * @Last Modified by: pmx
 * @Last Modified time: 2021-11-09 09:46:14
 */

import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { EventType } from 'src/app/enum/event-type.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { DivisionNumberStatistic } from 'src/app/network/model/garbage-station/division-number-statistic.model';
import {
  GetDivisionsParams,
  GetDivisionStatisticNumbersParams,
} from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageStationStatisticNumbersParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

import { RankModel } from 'src/app/view-model/rank.model';
import {
  IllegalMixintoDataResource,
  IllegalMixintoRankConverter,
} from './illegal-mixinto-rank.converter';

@Injectable()
export class IllegalMixintoRankBusiness
  implements IBusiness<IllegalMixintoDataResource[], RankModel[]>
{
  constructor(
    private divisionRequest: DivisionRequestService,
    private stationRequest: GarbageStationRequestService
  ) {}

  async getData(
    divisionId: string,
    resourceType: UserResourceType
  ): Promise<IllegalMixintoDataResource[]> {
    let data: IllegalMixintoDataResource[];
    switch (resourceType) {
      case UserResourceType.County:
      case UserResourceType.Committees:
        let type = EnumHelper.ConvertUserResourceToDivision(resourceType);
        data = await this.loadByDivision(divisionId, type);
        break;
      case UserResourceType.Station:
        data = await this.loadByStation(divisionId);
        break;
      default:
        throw new Error();
    }
    return data;
  }
  Converter: IConverter<IllegalMixintoDataResource[], RankModel[]> =
    new IllegalMixintoRankConverter();

  async load(
    divisionId: string,
    resourceType: UserResourceType,
    eventType: EventType
  ): Promise<RankModel[]> {
    let data = await this.getData(divisionId, resourceType);
    while (data.length < 6) {
      let item = new DivisionNumberStatistic();
      item.Name = '-';
      data.push(item);
    }
    let result = this.Converter.Convert(data, eventType);

    return result.sort((a, b) => {
      return b.value - a.value;
    });
  }

  getChildren(parentId: string, type: DivisionType) {
    let params = new GetDivisionsParams();
    params.AncestorId = parentId;
    params.DivisionType = type;
    return this.divisionRequest.cache.list(params);
  }

  async loadByDivision(divisionId: string, type: DivisionType) {
    let children = await this.getChildren(divisionId, type);
    let params = new GetDivisionStatisticNumbersParams();
    params.Ids = children.Data.map((x) => x.Id);
    let list = await this.divisionRequest.statistic.number.cache.list(params);
    return list.Data;
  }
  async loadByStation(divisionId: string) {
    let params = new GetGarbageStationStatisticNumbersParams();
    params.DivisionId = divisionId;
    params.PageSize = 999;
    let list = await this.stationRequest.statistic.number.cache.list(params);
    return list.Data;
  }
}

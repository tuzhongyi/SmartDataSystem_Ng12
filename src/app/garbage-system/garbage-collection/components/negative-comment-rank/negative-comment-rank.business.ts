/*
 * @Author: pmx
 * @Date: 2021-10-14 15:59:34
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-01 13:48:06
 */

import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
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
  NegativeCommentRankConverter,
  NegativeCommentResource,
} from './negative-comment-rank.converter';

@Injectable()
export class NegativeCommentRankBusiness
  implements IBusiness<NegativeCommentResource[], RankModel[]>
{
  constructor(
    private divisionRequest: DivisionRequestService,
    private stationRequest: GarbageStationRequestService
  ) {}

  async getData(
    divisionId: string,
    resourceType: UserResourceType
  ): Promise<NegativeCommentResource[]> {
    let data: NegativeCommentResource[];
    switch (resourceType) {
      case UserResourceType.County:
      case UserResourceType.Committees:
        data = await this.loadByDivision(divisionId);
        break;
      case UserResourceType.Station:
        data = await this.loadByStation(divisionId);
        break;
      default:
        throw new Error();
    }
    return data;
  }
  Converter: IConverter<NegativeCommentResource[], RankModel[]> =
    new NegativeCommentRankConverter();

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

  getChildren(parentId: string) {
    let params = new GetDivisionsParams();
    params.ParentId = parentId;
    return this.divisionRequest.cache.list(params);
  }

  async loadByDivision(divisionId: string) {
    let children = await this.getChildren(divisionId);
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

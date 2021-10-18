/*
 * @Author: pmx
 * @Date: 2021-10-14 15:59:34
 * @Last Modified by: pmx
 * @Last Modified time: 2021-10-14 16:55:16
 */

import { Injectable } from '@angular/core';
import { IRankConverter } from 'src/app/Converter/IRankconverter.interface';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { Division } from 'src/app/network/model/division.model';
import {
  GetDivisionsParams,
  GetDivisionStatisticNumbersParams,
} from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { RankModel } from 'src/app/view-model/rank.model';

@Injectable()
export class IllegalMixintoRankBusiness implements IRankConverter {
  constructor(private divisionRequest: DivisionRequestService) {}

  /**
   *
   * 当前区划信息
   */
  async getCurrentDivision(id: string) {
    let data = await this.divisionRequest.get(id);
    return data;
  }
  /**
   * 当前区划下后代区划
   * @param id
   * @param type
   * @returns
   */
  async listDescendantDivisions(id: string, type: DivisionType) {
    let params = new GetDivisionsParams();
    params.AncestorId = id;
    params.DivisionType = type;
    let res = await this.divisionRequest.list(params);
    return res.Data;
  }
  async statistic(ids: string[]) {
    let params = new GetDivisionStatisticNumbersParams();
    params.Ids = ids;
    let data = await this.divisionRequest.statistic.number.list(params);
    console.log(data);

    return data;
  }
  toRank<T>(data: T): RankModel {
    if (data instanceof Division) {
    }
    return new RankModel();
  }
}

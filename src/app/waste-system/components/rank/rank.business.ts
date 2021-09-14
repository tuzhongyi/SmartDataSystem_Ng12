/*
 * @Author: pmx
 * @Date: 2021-09-14 14:59:11
 * @Last Modified by:   pmx
 * @Last Modified time: 2021-09-14 14:59:11
 */
import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/business/Ibusiness';
import { RankModel } from 'src/app/model/rank.model';
import { DivisionRequestService } from 'src/app/request/division/division-request.service';
import { IRankConverter } from '../../../Converter/IRankconverter.interface';

export class RankBusiness implements IRankConverter {
  private _listData: any = [];

  constructor(private _business: IBusiness) {}

  async list() {
    let data = await this._business.list();
    console.log(data);
    return data;
  }
  toRank(data: any): RankModel {
    return new RankModel();
  }
}

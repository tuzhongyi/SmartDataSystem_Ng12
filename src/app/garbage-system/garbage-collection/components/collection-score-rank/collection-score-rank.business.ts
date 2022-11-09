/*
 * @Author: pmx
 * @Date: 2022-11-09 09:56:20
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-09 11:32:07
 */
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { GetCollectionPointScoreTopListParams } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.params';
import { CollectionPointsRequestService } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.service';
import { CollectionScoreRankConverter } from './collection-score-rank.converter';
import {
  CollectionScoreRankModel,
  ICollectionScoreRankSearchInfo,
} from './collection-score-rank.model';

@Injectable()
export class CollectionScoreRankBusiness {
  constructor(
    private _collectionPointRequest: CollectionPointsRequestService,
    private _converter: CollectionScoreRankConverter
  ) {}

  async init(searchInfo: ICollectionScoreRankSearchInfo) {
    let { Data } = await this._list(searchInfo);
    let res = this._converter.iterateToModel(Data);

    for (let i = 0; i < 10; i++) {
      let model = new CollectionScoreRankModel();
      model.Id = i.toString();
      model.Name = '垃圾房点位';
      model.Number = (Math.random() * 999) >> 0;
      res.push(model);
    }
    return res;
  }

  private _list(searchInfo: ICollectionScoreRankSearchInfo) {
    let params = new GetCollectionPointScoreTopListParams();
    params.BeginTime = searchInfo.BeginTime;
    params.EndTime = searchInfo.EndTime;
    params.Score = searchInfo.Type;
    return this._collectionPointRequest.statistic.scoreTopList(params);
  }
}

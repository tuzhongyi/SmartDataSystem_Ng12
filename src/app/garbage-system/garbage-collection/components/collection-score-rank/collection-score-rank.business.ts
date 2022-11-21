/*
 * @Author: pmx
 * @Date: 2022-11-09 09:56:20
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-16 15:57:01
 */
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { GetCollectionPointScoreTopListParams } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.params';
import { CollectionPointsRequestService } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.service';
import { GetDivisionGarbageScoresParams } from 'src/app/network/request/garbage_vehicles/divisions/division-request.params';
import { CollectionDivisionRequestService } from 'src/app/network/request/garbage_vehicles/divisions/division-request.service';
import { CollectionScoreRankConverter } from './collection-score-rank.converter';
import {
  CollectionScoreRankModel,
  ICollectionScoreRankSearchInfo,
} from './collection-score-rank.model';

@Injectable()
export class CollectionScoreRankBusiness {
  constructor(
    private _collectionPointRequest: CollectionPointsRequestService,
    private _collectionDivisionRequest: CollectionDivisionRequestService,
    private _converter: CollectionScoreRankConverter
  ) {}

  async init(searchInfo: ICollectionScoreRankSearchInfo) {
    let res = await this._list(searchInfo);
    console.log(res);
    // let res = this._converter.iterateToModel(Data);

    // for (let i = 0; i < 10; i++) {
    //   let model = new CollectionScoreRankModel();
    //   model.Id = i.toString();
    //   model.Name = '垃圾房点位';
    //   model.Number = (Math.random() * 999) >> 0;
    //   res.push(model);
    // }
    // return res;
    return [];
  }

  private _list(searchInfo: ICollectionScoreRankSearchInfo) {
    let params = new GetDivisionGarbageScoresParams();
    params.BeginTime = searchInfo.BeginTime;
    params.EndTime = searchInfo.EndTime;
    // return this._collectionDivisionRequest.garbage.score.list(params)
  }
}

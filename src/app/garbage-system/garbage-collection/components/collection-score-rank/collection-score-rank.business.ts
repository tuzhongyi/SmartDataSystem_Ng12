/*
 * @Author: pmx
 * @Date: 2022-11-09 09:56:20
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-16 15:57:01
 */
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { Guid } from 'src/app/common/tools/guid';
import { CollectionPointScore } from 'src/app/enum/collection-point-score.enum';
import { GetGarbageCollectionEventRecordsParams } from 'src/app/network/request/garbage_vehicles/collection-event/collection-event.params';
import { CollectionEventRequestService } from 'src/app/network/request/garbage_vehicles/collection-event/collection-event.service';
import {
  GetCollectionPointNumberParams,
  GetCollectionPointScoreTopListParams,
  GetCollectionPointsParams,
} from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.params';
import { CollectionPointsRequestService } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.service';
import {
  GetDivisionGarbageScoresParams,
  GetDivisionsParams,
} from 'src/app/network/request/garbage_vehicles/divisions/division-request.params';
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
    private _converter: CollectionScoreRankConverter
  ) {}

  async init(searchInfo: ICollectionScoreRankSearchInfo) {
    let { Data } = await this._listScores(searchInfo);
    console.log(Data);

    let res = this._converter.iterateToModel(Data);

    // for (let i = 0; i < 10; i++) {
    //   let model = new CollectionScoreRankModel();
    //   model.Id = Guid.NewGuid().ToString('N');
    //   model.Name = '垃圾房点位';
    //   model.Number = (Math.random() * 999) >> 0;
    //   res.push(model);
    // }

    return res;
  }

  private _listScores(searchInfo: ICollectionScoreRankSearchInfo) {
    let params = new GetCollectionPointScoreTopListParams();
    params.BeginTime = searchInfo.BeginTime;
    params.EndTime = searchInfo.EndTime;
    params.DivisionIds = [searchInfo.DivisionId];
    params.Score = CollectionPointScore.Good;

    return this._collectionPointRequest.statistic.scoreTopList(params);
  }
}

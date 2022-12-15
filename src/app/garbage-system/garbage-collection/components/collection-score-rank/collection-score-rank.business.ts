/*
 * @Author: pmx
 * @Date: 2022-11-09 09:56:20
 * @Last Modified by: pmx
 * @Last Modified time: 2022-12-13 11:15:18
 */
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { ICommonRankBusiness } from 'src/app/common/components/common-rank/common-rank.model';
import { Guid } from 'src/app/common/tools/guid';
import { CollectionPointScore } from 'src/app/enum/collection-point-score.enum';
import { ScoreTop } from 'src/app/network/model/score-top.model';
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

import * as uuid from 'uuid';
@Injectable()
export class CollectionScoreRankBusiness {
  constructor(
    private _collectionPointRequest: CollectionPointsRequestService,
    private _converter: CollectionScoreRankConverter
  ) {}

  async init(searchInfo: ICollectionScoreRankSearchInfo) {
    let { Data } = await this._listScores(searchInfo);
    // console.log(Data);

    // for (let i = 0; i < 10; i++) {
    //   let scoreTop = new ScoreTop();
    //   scoreTop.Id = uuid.v4();
    //   let unicode1 = Math.floor(Math.random() * (0x9fa5 - 0x4e00) + 0x4e00);
    //   let unicode2 = Math.floor(Math.random() * (0x9fa5 - 0x4e00) + 0x4e00);
    //   let unicode3 = Math.floor(Math.random() * (0x9fa5 - 0x4e00) + 0x4e00);
    //   scoreTop.Name = String.fromCodePoint(unicode1, unicode2, unicode3);
    //   scoreTop.Number = (Math.random() * 100) >> 0;
    //   Data.push(scoreTop);
    // }
    let res = this._converter.Convert(Data);

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

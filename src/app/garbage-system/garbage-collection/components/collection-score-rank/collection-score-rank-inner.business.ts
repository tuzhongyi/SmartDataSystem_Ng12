/*
 * @Author: pmx
 * @Date: 2022-11-09 09:56:20
 * @Last Modified by: pmx
 * @Last Modified time: 2022-12-06 15:03:21
 */
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { CommonRankConverter } from 'src/app/common/components/common-rank/common-rank.converter';
import { ICommonRankBusiness } from 'src/app/common/components/common-rank/common-rank.model';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
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
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { CollectionScoreRankConverter } from './collection-score-rank.converter';
import {
  CollectionScoreRankModel,
  ICollectionScoreRankSearchInfo,
} from './collection-score-rank.model';

@Injectable()
export class CollectionScoreRankInnerBusiness {
  today = new Date();

  searchInfo: ICollectionScoreRankSearchInfo = {
    BeginTime: DurationParams.allMonth(this.today).BeginTime,
    EndTime: DurationParams.allMonth(this.today).EndTime,
    DivisionId: this._globalStorage.divisionId,
    Type: CollectionPointScore.Poor,
  };
  constructor(
    private _globalStorage: GlobalStorageService,
    private _collectionPointRequest: CollectionPointsRequestService,
    private _converter: CommonRankConverter
  ) {}

  async init() {
    let { Data } = await this._listScores();

    let res = this._converter.Convert(Data);

    return res;
  }

  private _listScores() {
    let params = new GetCollectionPointScoreTopListParams();
    params.BeginTime = this.searchInfo.BeginTime;
    params.EndTime = this.searchInfo.EndTime;
    params.DivisionIds = [this.searchInfo.DivisionId];
    params.Score = CollectionPointScore.Good;

    return this._collectionPointRequest.statistic.scoreTopList(params);
  }
}

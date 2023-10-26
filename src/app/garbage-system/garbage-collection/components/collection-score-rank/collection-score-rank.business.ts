/*
 * @Author: pmx
 * @Date: 2022-11-09 09:56:20
 * @Last Modified by: pmx
 * @Last Modified time: 2022-12-21 17:12:11
 */
import { Injectable } from '@angular/core';
import { Guid } from 'src/app/common/tools/guid';
import { ScoreTop } from 'src/app/network/model/garbage-station/score-top.model';
import { GetCollectionPointScoreTopListParams } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.params';
import { CollectionPointsRequestService } from 'src/app/network/request/garbage_vehicles/collection-points/collection-points.service';
import { CollectionScoreRankConverter } from './collection-score-rank.converter';
import { ICollectionScoreRankSearchInfo } from './collection-score-rank.model';

import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
@Injectable()
export class CollectionScoreRankBusiness {
  constructor(
    private _globalStorageService: GlobalStorageService,

    private _collectionPointRequest: CollectionPointsRequestService,
    private _converter: CollectionScoreRankConverter
  ) {}

  async init(searchInfo: ICollectionScoreRankSearchInfo) {
    let { Data } = await this._listScores(searchInfo);
    // console.log(Data);

    for (let i = 0; i < 0; i++) {
      let scoreTop = new ScoreTop();
      scoreTop.Id = Guid.NewGuid().ToString('N');
      let unicode1 = Math.floor(Math.random() * (0x9fa5 - 0x4e00) + 0x4e00);
      let unicode2 = Math.floor(Math.random() * (0x9fa5 - 0x4e00) + 0x4e00);
      let unicode3 = Math.floor(Math.random() * (0x9fa5 - 0x4e00) + 0x4e00);
      scoreTop.Name = String.fromCodePoint(unicode1, unicode2, unicode3);
      scoreTop.Number = (Math.random() * 100) >> 0;
      Data.push(scoreTop);
    }
    Data.sort((a, b) => {
      return (a.Number - b.Number) * -1;
    });
    let res = this._converter.Convert(Data);

    return res;
  }

  private async _listScores(searchInfo: ICollectionScoreRankSearchInfo) {
    let params = new GetCollectionPointScoreTopListParams();
    params.BeginTime = searchInfo.BeginTime;
    params.EndTime = searchInfo.EndTime;
    params.DivisionIds = searchInfo.DivisionIds;

    if (searchInfo.DivisionIds.length == 1) {
      if (
        searchInfo.DivisionIds[0] ==
        (await this._globalStorageService.defaultDivisionId)
      ) {
        params.DivisionIds = [];
      }
    }

    if (searchInfo.Type !== void 0) params.Score = searchInfo.Type;

    return this._collectionPointRequest.statistic.scoreTopList(params);
  }
}

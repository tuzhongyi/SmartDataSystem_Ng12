import { Injectable } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { GetDivisionGarbageScoresParams } from 'src/app/network/request/garbage_vehicles/divisions/collection-division-request.params';
import { CollectionDivisionRequestService } from 'src/app/network/request/garbage_vehicles/divisions/collection-division-request.service';
import { CommonChartModel } from 'src/app/view-model/common-chart.model';
import { CollectionScoreBarConverter } from './collection-score-bar.converter';
import {
  CollectionScoreBarModel,
  ICollectionScoreBarSearchInfo,
} from './collection-score-bar.model';

@Injectable()
export class CollectionScoreBarBusiness {
  constructor(
    private _collectionDivisionRequest: CollectionDivisionRequestService,
    private _converter: CollectionScoreBarConverter
  ) {}

  async init(searchInfo: ICollectionScoreBarSearchInfo) {
    let Data = await this._listGarbageScore(searchInfo);

    // console.log(Data);

    let res = this._converter.Convert(Data);

    return res;
  }
  private _listGarbageScore(searchInfo: ICollectionScoreBarSearchInfo) {
    let params = new GetDivisionGarbageScoresParams();
    params.BeginTime = searchInfo.BeginTime;
    params.EndTime = searchInfo.EndTime;
    params.DivisionIds = searchInfo.DivisionIds;

    if (searchInfo.TimeUnit) params.TimeUnit = searchInfo.TimeUnit;

    return this._collectionDivisionRequest.garbage.score.list(params);
  }
}

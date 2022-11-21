import { Injectable } from '@angular/core';
import { DivisionGarbageScore } from 'src/app/network/model/division-garbage-score.model';
import { GarbageVehicleDivisionRequestService } from 'src/app/network/request/garbage_vehicles/divisions/division-request.service';
import { CollectionScorePieConverter } from './collection-score-pie.converter';
import { ICollectionScorePieSearchInfo } from './collection-score-pie.model';

@Injectable()
export class CollectionScorePieBusiness {
  constructor(
    private _collectionDivisionRequest: GarbageVehicleDivisionRequestService,
    private _converter: CollectionScorePieConverter
  ) {}

  async init(searchInfo: ICollectionScorePieSearchInfo) {
    let Data = await this._getDivisionScore(searchInfo);
    console.log('分类评分', Data);
    let res = this._converter.Convert(Data);

    return res;
  }
  private _getDivisionScore(
    searchInfo: ICollectionScorePieSearchInfo
  ): Promise<DivisionGarbageScore> {
    return this._collectionDivisionRequest.garbage.score.get(
      searchInfo.DivisionId
    );
  }
}

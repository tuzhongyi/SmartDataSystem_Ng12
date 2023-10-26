import { Injectable } from '@angular/core';
import { DivisionGarbageScore } from 'src/app/network/model/garbage-station/division-garbage-score.model';
import { CollectionDivisionRequestService } from 'src/app/network/request/garbage_vehicles/divisions/collection-division-request.service';
import { CollectionScorePieConverter } from './collection-score-pie.converter';
import { ICollectionScorePieSearchInfo } from './collection-score-pie.model';

@Injectable()
export class CollectionScorePieBusiness {
  constructor(
    private _collectionDivisionRequest: CollectionDivisionRequestService,
    private _converter: CollectionScorePieConverter
  ) {}

  async init(searchInfo: ICollectionScorePieSearchInfo) {
    let Data = await this._getDivisionScore(searchInfo);
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

import { Injectable } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { DivisionGarbageScore } from 'src/app/network/model/garbage-station/division-garbage-score.model';
import { CollectionDivisionRequestService } from 'src/app/network/request/garbage_vehicles/divisions/collection-division-request.service';
import { CollectionScorePieConverter } from './collection-score-pie.converter';
import { ICollectionScorePieSearchInfo } from './collection-score-pie.model';

@Injectable()
export class CollectionScorePieBusiness {
  constructor(
    private _collectionDivisionRequest: CollectionDivisionRequestService,
    private _converter: CollectionScorePieConverter,
    private global: GlobalStorageService
  ) {}

  async init(searchInfo: ICollectionScorePieSearchInfo) {
    let Data = await this._getDivisionScore(searchInfo);
    let res = this._converter.Convert(Data);

    return res;
  }
  private async _getDivisionScore(
    searchInfo: ICollectionScorePieSearchInfo
  ): Promise<DivisionGarbageScore> {
    let divisionId =
      searchInfo.DivisionId ?? (await this.global.division.selected).Id;
    return this._collectionDivisionRequest.garbage.score.get(divisionId);
  }
}

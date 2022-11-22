import { Injectable } from '@angular/core';
import { ICommonPieCharBusiness } from 'src/app/common/components/common-pie-chart/common-pie-chart.model';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { HWPieChartConverter } from 'src/app/common/components/common-pie-chart/hw-pie-chart.converter';
import { DivisionGarbageScore } from 'src/app/network/model/division-garbage-score.model';
import { CollectionDivisionRequestService } from 'src/app/network/request/garbage_vehicles/divisions/division-request.service';
import { ICollectionScorePieSearchInfo } from './collection-score-pie.model';

@Injectable()
export class CollectionScorePieBusiness implements ICommonPieCharBusiness {
  searchInfo: ICollectionScorePieSearchInfo = {
    DivisionId: this._globalStorage.divisionId,
  };

  constructor(
    private _globalStorage: GlobalStorageService,
    private _collectionDivisionRequest: CollectionDivisionRequestService,
    private _converter: HWPieChartConverter
  ) {}

  async init() {
    let Data = await this._getDivisionScore();
    let res = this._converter.Convert(Data);

    return res;
  }
  private _getDivisionScore(): Promise<DivisionGarbageScore> {
    return this._collectionDivisionRequest.garbage.score.get(
      this.searchInfo.DivisionId
    );
  }
}

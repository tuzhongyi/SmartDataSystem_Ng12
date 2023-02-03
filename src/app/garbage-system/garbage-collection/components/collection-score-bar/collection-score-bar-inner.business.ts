import { Injectable } from '@angular/core';
import { CommonBarChartConverter } from 'src/app/common/components/common-bar-chart/common-bar-chart.converter';
import { ICommonBarCharBusiness } from 'src/app/common/components/common-bar-chart/common-bar-chart.model';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { TimeService } from 'src/app/common/service/time.service';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { GetDivisionGarbageScoresParams } from 'src/app/network/request/garbage_vehicles/divisions/collection-division-request.params';
import { CollectionDivisionRequestService } from 'src/app/network/request/garbage_vehicles/divisions/collection-division-request.service';
import { CommonChartModel } from 'src/app/view-model/common-chart.model';
import { ICollectionScoreBarSearchInfo } from './collection-score-bar.model';

@Injectable()
export class CollectionScoreBarInnerBusiness implements ICommonBarCharBusiness {
  today = new Date();
  searchInfo: ICollectionScoreBarSearchInfo = {
    BeginTime: TimeService.beginTime(TimeService.backDate(this.today, 7)),
    EndTime: TimeService.endTime(TimeService.backDate(this.today, 1)),
    DivisionIds: [this._globalStorage.divisionId],
    TimeUnit: TimeUnit.Day,
  };
  constructor(
    private _globalStorage: GlobalStorageService,
    private _collectionDivisionRequest: CollectionDivisionRequestService,
    private _converter: CommonBarChartConverter
  ) {}
  async init() {
    let Data = await this._listGarbageScore();

    console.log(Data);

    let res = this._converter.Convert(Data);
    return res;
  }

  private _listGarbageScore() {
    let params = new GetDivisionGarbageScoresParams();
    params.BeginTime = this.searchInfo.BeginTime;
    params.EndTime = this.searchInfo.EndTime;
    params.DivisionIds = this.searchInfo.DivisionIds;

    if (this.searchInfo.TimeUnit) params.TimeUnit = this.searchInfo.TimeUnit;

    return this._collectionDivisionRequest.garbage.score.list(params);
  }
}

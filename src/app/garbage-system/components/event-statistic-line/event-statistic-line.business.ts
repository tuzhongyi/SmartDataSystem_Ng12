import { Injectable } from '@angular/core';
import { CommonLineChartConverter } from 'src/app/common/components/common-line-chart/common-line-chart.converter';
import {
  CommonLineChartModel,
  ICommonLineCharBusiness,
} from 'src/app/common/components/common-line-chart/common-line-chart.model';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Time } from 'src/app/common/tools/time';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { GetDivisionEventNumbersParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';

@Injectable()
export class EventStatisticLineBusiness implements ICommonLineCharBusiness {
  searchInfo: IEventStatisticLineSearchInfo = {
    DivisionId: this._globalStorage.divisionId,
    BeginTime: Time.beginTime(Date.now()),
    EndTime: Time.endTime(Date.now()),
    TimeUnit: TimeUnit.Hour,
  };
  constructor(
    private _divisionRequest: DivisionRequestService,
    private _globalStorage: GlobalStorageService,
    private _converter: CommonLineChartConverter
  ) {
    console.log('sdfsdf', this._globalStorage.divisionId);
  }
  async init() {
    let res = await this._historyList();
    console.log(res);
    return new CommonLineChartModel();
  }
  private _historyList() {
    let params = new GetDivisionEventNumbersParams();
    params.BeginTime = this.searchInfo.BeginTime;
    params.EndTime = this.searchInfo.EndTime;
    params.TimeUnit = this.searchInfo.TimeUnit;

    return this._divisionRequest.eventNumber.history.list(
      this.searchInfo.DivisionId,
      params
    );
  }
}

export interface IEventStatisticLineSearchInfo {
  DivisionId: string;
  BeginTime: Date;
  EndTime: Date;
  TimeUnit: TimeUnit;
}

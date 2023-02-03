import { Injectable } from '@angular/core';
import { CommonLineChartConverter } from 'src/app/common/components/common-line-chart/common-line-chart.converter';
import {
  CommonLineChartModel,
  ICommonLineCharBusiness,
} from 'src/app/common/components/common-line-chart/common-line-chart.model';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { TimeService } from 'src/app/common/service/time.service';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { TrashCanType } from 'src/app/enum/trashcan-type.enum';
import { GetDivisionGarbageWeightsParams } from 'src/app/network/request/garbage_vehicles/divisions/collection-division-request.params';
import { CollectionDivisionRequestService } from 'src/app/network/request/garbage_vehicles/divisions/collection-division-request.service';
import { ICollectionWeightLineSearchInfo } from './collection-weight-line.model';

@Injectable()
export class CollectionWeightLineInnerBusiness
  implements ICommonLineCharBusiness
{
  today = new Date();

  searchInfo: ICollectionWeightLineSearchInfo = {
    BeginTime: TimeService.beginTime(TimeService.backDate(this.today, 7)),
    EndTime: TimeService.endTime(TimeService.backDate(this.today, 1)),
    DivisionIds: [this._globalStorage.divisionId],
    TimeUnit: TimeUnit.Day,
    Type: TrashCanType.Dry,
  };
  constructor(
    private _globalStorage: GlobalStorageService,
    private _collectionDivisionRequest: CollectionDivisionRequestService,
    private _converter: CommonLineChartConverter
  ) {}
  async init() {
    let Data = await this._listGarbageWeight();
    // console.log(Data);

    let res = this._converter.Convert(Data, this.searchInfo.Type);

    return res;
  }

  private _listGarbageWeight() {
    let params = new GetDivisionGarbageWeightsParams();
    params.BeginTime = this.searchInfo.BeginTime;
    params.EndTime = this.searchInfo.EndTime;
    params.DivisionIds = this.searchInfo.DivisionIds;
    if (this.searchInfo.TimeUnit) params.TimeUnit = this.searchInfo.TimeUnit;

    return this._collectionDivisionRequest.garbage.weight.list(params);
  }
}

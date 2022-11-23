import { Injectable } from '@angular/core';
import { CommonLineChartConverter } from 'src/app/common/components/common-line-chart/common-line-chart.converter';
import {
  CommonLineChartModel,
  ICommonLineCharBusiness,
} from 'src/app/common/components/common-line-chart/common-line-chart.model';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Time } from 'src/app/common/tools/time';
import { TrashCanType } from 'src/app/enum/trashcan-type.enum';
import { GetGarbageCollectionEventRecordsParams } from 'src/app/network/request/garbage_vehicles/collection-event/collection-event.params';
import { CollectionEventRequestService } from 'src/app/network/request/garbage_vehicles/collection-event/collection-event.service';
import { GetDivisionGarbageWeightsParams } from 'src/app/network/request/garbage_vehicles/divisions/division-request.params';
import { CollectionDivisionRequestService } from 'src/app/network/request/garbage_vehicles/divisions/division-request.service';
import { DurationParams } from 'src/app/network/request/IParams.interface';

@Injectable()
export class CollectionEventLineBusiness implements ICommonLineCharBusiness {
  today = new Date();
  searchInfo: ICollectionEventLineSearchInfo = {
    BeginTime: Time.curWeek(this.today).beginTime,
    EndTime: Time.curWeek(this.today).endTime,
    DivisionIds: [this._globalStorage.divisionId],
    TrashCanType: TrashCanType.Dry,
  };
  constructor(
    private _globalStorage: GlobalStorageService,
    private _collectionDivisionRequest: CollectionDivisionRequestService,
    private _converter: CommonLineChartConverter
  ) {}
  async init() {
    let Data = await this._list();

    let res = this._converter.Convert(
      Data,
      this.searchInfo.TrashCanType,
      this.today
    );

    return res;
  }

  private _list() {
    let params = new GetDivisionGarbageWeightsParams();
    params.BeginTime = this.searchInfo.BeginTime;
    params.EndTime = this.searchInfo.EndTime;
    params.DivisionIds = this.searchInfo.DivisionIds;
    return this._collectionDivisionRequest.garbage.weight.list(params);
  }
}

export interface ICollectionEventLineSearchInfo {
  BeginTime: Date;
  EndTime: Date;

  DivisionIds?: string[];
  TrashCanType?: TrashCanType;
}

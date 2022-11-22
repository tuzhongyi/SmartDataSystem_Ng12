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

@Injectable()
export class CollectionEventLineBusiness implements ICommonLineCharBusiness {
  searchInfo: ICollectionEventLineSearchInfo = {
    BeginTime: Time.beginTime(new Date()),
    EndTime: Time.beginTime(new Date()),
    DivisionIds: [this._globalStorage.divisionId],
    TrashCanType: TrashCanType.Dry,
  };
  constructor(
    private _globalStorage: GlobalStorageService,
    private _collectionEventRequest: CollectionEventRequestService,
    private _converter: CommonLineChartConverter
  ) {}
  async init() {
    let { Data } = await this._list();

    let res = this._converter.Convert(Data);
    return res;
  }

  private _list() {
    let params = new GetGarbageCollectionEventRecordsParams();
    params.BeginTime = this.searchInfo.BeginTime;
    params.EndTime = this.searchInfo.EndTime;

    if (this.searchInfo.DivisionIds)
      params.DivisionIds = this.searchInfo.DivisionIds;
    if (this.searchInfo.TrashCanType)
      params.TrashCanType = this.searchInfo.TrashCanType;
    return this._collectionEventRequest.record.garbageCollection.list(params);
  }
}

export interface ICollectionEventLineSearchInfo {
  BeginTime: Date;
  EndTime: Date;

  DivisionIds?: string[];
  TrashCanType?: TrashCanType;
}

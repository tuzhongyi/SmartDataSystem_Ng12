import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { StoreService } from 'src/app/common/service/store.service';
import { Division } from 'src/app/network/model/division.model';
import { IModel } from 'src/app/network/model/model.interface';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { GarbageStationWindowRecordFilterConverter } from './garbage-station-window-record-filter.converter';
import { GarbageStationWindowRecordFilterModel } from './garbage-station-window-record-filter.model';

@Injectable()
export class GarbageStationWindowRecordFilterBusiness
  implements IBusiness<IModel, GarbageStationWindowRecordFilterModel>
{
  constructor(
    private store: StoreService,
    private divisionService: DivisionRequestService,
    private stationService: GarbageStationRequestService
  ) {}
  Converter: IConverter<IModel, GarbageStationWindowRecordFilterModel> =
    new GarbageStationWindowRecordFilterConverter();
  subscription?: ISubscription | undefined;
  loading?: EventEmitter<void> | undefined;
  async load(
    divisionId?: string
  ): Promise<GarbageStationWindowRecordFilterModel> {
    if (!divisionId) {
      divisionId = this.store.divisionId;
    }

    let stations = await this.getData(divisionId);

    let model = this.Converter.Convert(stations);

    return model;
  }

  async getData(divisionId: string): Promise<IModel> {
    let params = new GetGarbageStationsParams();
    params.DivisionId = divisionId;
    let paged = await this.stationService.cache.list(params);
    return paged.Data;
  }
}

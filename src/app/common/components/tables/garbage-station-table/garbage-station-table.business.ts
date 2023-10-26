import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';

import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { PagedParams } from 'src/app/network/request/IParams.interface';
import { SearchOptions } from 'src/app/view-model/search-options.model';
import { GarbageStationPagedConverter } from './garbage-station-table.converter';
import { GarbageStationTableModel } from './garbage-station-table.model';

@Injectable()
export class GarbageStationTableBusiness
  implements
    IBusiness<PagedList<GarbageStation>, PagedList<GarbageStationTableModel>>
{
  constructor(
    private storeService: GlobalStorageService,
    private stationService: GarbageStationRequestService,
    public Converter: GarbageStationPagedConverter
  ) {}

  subscription?: ISubscription | undefined;
  loading?: EventEmitter<void> | undefined;
  async load(
    page: PagedParams,
    opts?: SearchOptions,
    stationId?: string,
    divisionId?: string
  ): Promise<PagedList<GarbageStationTableModel>> {
    if (!divisionId) {
      divisionId = this.storeService.divisionId;
    }
    let data = await this.getData(divisionId, page, opts, stationId);
    let model = await this.Converter.Convert(data);
    return model;
  }
  getData(
    divisionId: string,
    page: PagedParams,
    opts?: SearchOptions,
    stationId?: string
  ): Promise<PagedList<GarbageStation>> {
    let params = new GetGarbageStationsParams();
    params = Object.assign(params, page);
    if (opts) {
      (params as any)[opts.propertyName] = opts.text;
    }
    params.DivisionId = divisionId;
    if (stationId) {
      params.Ids = [stationId];
    }
    return this.stationService.list(params);
  }
}

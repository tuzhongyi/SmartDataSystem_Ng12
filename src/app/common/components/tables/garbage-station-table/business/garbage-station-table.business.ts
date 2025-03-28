import { EventEmitter, Injectable } from '@angular/core';
import {
  IBusiness,
  IDowanload,
} from 'src/app/common/interfaces/bussiness.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { StoreService } from 'src/app/common/service/store.service';
import { StationState } from 'src/app/enum/station-state.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { PagedParams } from 'src/app/network/request/IParams.interface';
import { SearchOptions } from 'src/app/view-model/search-options.model';
import { GarbageStationTableModel } from '../garbage-station-table.model';
import { GarbageStationTableDownloadBusiness } from './garbage-station-table-download.business';
import { GarbageStationPagedConverter } from './garbage-station-table.converter';
import { GarbageStationTableService } from './garbage-station-table.service';

@Injectable()
export class GarbageStationTableBusiness
  implements
    IBusiness<PagedList<GarbageStation>, PagedList<GarbageStationTableModel>>,
    IDowanload
{
  constructor(
    private store: StoreService,
    private service: GarbageStationTableService,
    private _download: GarbageStationTableDownloadBusiness,
    private converter: GarbageStationPagedConverter
  ) {}
  subscription?: ISubscription | undefined;
  loading?: EventEmitter<void> | undefined;
  async load(
    page: PagedParams,
    opts?: SearchOptions,
    state?: StationState,
    stationId?: string,
    divisionId?: string
  ): Promise<PagedList<GarbageStationTableModel>> {
    if (!divisionId) {
      divisionId = this.store.divisionId;
    }
    let data = await this.service.load(
      divisionId,
      page,
      opts,
      state,
      stationId
    );
    let model = await this.converter.Convert(data.Data);

    let paged = new PagedList<GarbageStationTableModel>();
    paged.Data = model;
    paged.Page = data.Page;

    return paged;
  }

  async download(
    opts?: SearchOptions,
    state?: StationState,
    stationId?: string,
    divisionId?: string
  ) {
    if (!divisionId) {
      divisionId = this.store.divisionId;
    }
    let datas = await this.service.all(divisionId, opts, state, stationId);
    let models = await this.converter.Convert(datas);
    this._download.download(divisionId, models);
  }
}

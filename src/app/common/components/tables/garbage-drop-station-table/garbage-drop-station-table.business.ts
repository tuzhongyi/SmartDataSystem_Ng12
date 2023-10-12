import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station-number-statistic.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageStationStatisticNumbersParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { PagedParams } from 'src/app/network/request/IParams.interface';
import { SearchOptions } from 'src/app/view-model/search-options.model';
import { GarbageDropStationPagedTableConverter } from './garbage-drop-station-table.converter';
import {
  GarbageDropStationTableModel,
  GarbageDropStationTableSourceModel,
} from './garbage-drop-station-table.model';

@Injectable()
export class GarbageDropStationTableBusiness
  implements
    IBusiness<
      PagedList<GarbageStationNumberStatistic>,
      PagedList<GarbageDropStationTableModel>
    >
{
  constructor(
    private storeService: GlobalStorageService,
    private stationService: GarbageStationRequestService,
    private divisionService: DivisionRequestService,
    public Converter: GarbageDropStationPagedTableConverter
  ) {}

  loading?: EventEmitter<void> | undefined;
  async load(
    page: PagedParams,
    opts?: SearchOptions,
    source?: GarbageDropStationTableSourceModel
  ): Promise<PagedList<GarbageDropStationTableModel>> {
    let id = this.storeService.divisionId;
    let type = DivisionType.None;
    if (source && source.type !== DivisionType.None) {
      if (source.id) {
        id = source.id;
      }
    }
    let data = await this.getData(id, page, opts);
    let model = await this.Converter.Convert(data);
    return model;
  }
  getData(
    id: string,
    page: PagedParams,
    opts?: SearchOptions
  ): Promise<PagedList<GarbageStationNumberStatistic>> {
    let params = new GetGarbageStationStatisticNumbersParams();
    params.DivisionId = id;
    params = Object.assign(params, page);
    params.GarbageDrop = true;
    if (opts) {
      (params as any)[opts.propertyName] = opts.text;
    }

    return this.stationService.statistic.number.list(params);
  }
}

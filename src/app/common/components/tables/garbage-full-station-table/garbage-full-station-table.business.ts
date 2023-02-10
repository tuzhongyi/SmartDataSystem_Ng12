import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station-number-statistic.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import {
  GetGarbageStationsParams,
  GetGarbageStationStatisticNumbersParams,
} from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { PagedParams } from 'src/app/network/request/IParams.interface';
import { SearchOptions } from 'src/app/view-model/search-options.model';
import { GarbageFullStationPagedTableConverter } from './garbage-full-station-table.converter';
import { GarbageFullStationTableModel } from './garbage-full-station-table.model';

@Injectable()
export class GarbageFullStationTableBusiness
  implements
    IBusiness<
      PagedList<GarbageStationNumberStatistic>,
      PagedList<GarbageFullStationTableModel>
    >
{
  constructor(
    private storeService: GlobalStorageService,
    private stationService: GarbageStationRequestService,
    private divisionService: DivisionRequestService,
    public Converter: GarbageFullStationPagedTableConverter
  ) {}
  loading?: EventEmitter<void> | undefined;
  async load(
    page: PagedParams,
    opts?: SearchOptions
  ): Promise<PagedList<GarbageFullStationTableModel>> {
    let data = await this.getData(this.storeService.divisionId, page, opts);
    let model = await this.Converter.Convert(data, {
      station: (id: string) => {
        return this.stationService.cache.get(id);
      },
      division: (id: string) => {
        return this.divisionService.cache.get(id);
      },
    });
    return model;
  }
  async getData(
    divisionId: string,
    page: PagedParams,
    opts?: SearchOptions
  ): Promise<PagedList<GarbageStationNumberStatistic>> {
    let p = new GetGarbageStationsParams();
    p.DryFull = true;
    let stations = await this.stationService.list(p);
    if (stations.Data.length == 0) {
      return {
        Page: stations.Page,
        Data: [],
      };
    }
    let params = new GetGarbageStationStatisticNumbersParams();
    params.DivisionId = divisionId;
    params = Object.assign(params, page);
    params.Ids = stations.Data.map((x) => x.Id);
    if (opts) {
      (params as any)[opts.propertyName] = opts.text;
    }

    return this.stationService.statistic.number.list(params);
  }
}

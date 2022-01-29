import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IPromiseConverter } from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { Flags } from 'src/app/common/tools/flags';
import { StationState } from 'src/app/enum/station-state.enum';
import { StoreService } from 'src/app/global/service/store.service';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station-number-statistic.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import {
  GetGarbageStationsParams,
  GetGarbageStationStatisticNumbersParams,
} from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { PagedParams } from 'src/app/network/request/IParams.interface';
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
    private storeService: StoreService,
    private stationService: GarbageStationRequestService,
    private divisionService: DivisionRequestService
  ) {}
  Converter: IPromiseConverter<
    PagedList<GarbageStationNumberStatistic>,
    PagedList<GarbageFullStationTableModel>
  > = new GarbageFullStationPagedTableConverter();
  loading?: EventEmitter<void> | undefined;
  async load(
    page: PagedParams,
    name?: string
  ): Promise<PagedList<GarbageFullStationTableModel>> {
    let data = await this.getData(this.storeService.divisionId, page, name);
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
    name?: string
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
    params.Name = name;
    return this.stationService.statistic.number.list(params);
  }
}
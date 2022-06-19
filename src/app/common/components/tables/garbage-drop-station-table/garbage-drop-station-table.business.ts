import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IPromiseConverter } from 'src/app/common/interfaces/converter.interface';
import { StoreService } from 'src/app/global/service/store.service';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station-number-statistic.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageStationStatisticNumbersParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { PagedParams } from 'src/app/network/request/IParams.interface';
import { SearchOptions } from 'src/app/view-model/search-options.model';
import { GarbageDropStationPagedTableConverter } from './garbage-drop-station-table.converter';
import { GarbageDropStationTableModel } from './garbage-drop-station-table.model';

@Injectable()
export class GarbageDropStationTableBusiness
  implements
    IBusiness<
      PagedList<GarbageStationNumberStatistic>,
      PagedList<GarbageDropStationTableModel>
    >
{
  constructor(
    private storeService: StoreService,
    private stationService: GarbageStationRequestService,
    private divisionService: DivisionRequestService
  ) {}

  Converter: IPromiseConverter<
    PagedList<GarbageStationNumberStatistic>,
    PagedList<GarbageDropStationTableModel>
  > = new GarbageDropStationPagedTableConverter();

  loading?: EventEmitter<void> | undefined;
  async load(
    page: PagedParams,
    opts?: SearchOptions
  ): Promise<PagedList<GarbageDropStationTableModel>> {
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
  getData(
    divisionId: string,
    page: PagedParams,
    opts?: SearchOptions
  ): Promise<PagedList<GarbageStationNumberStatistic>> {
    let params = new GetGarbageStationStatisticNumbersParams();
    params.DivisionId = divisionId;
    params = Object.assign(params, page);
    params.GarbageDrop = true;
    if(opts)
    {
      (params as any)[opts.propertyName] = opts.text;
    }
    
    return this.stationService.statistic.number.list(params);
  }
}

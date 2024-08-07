import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { GarbageFullStationPagedTableConverter } from './garbage-full-station-table.converter';
import {
  GarbageFullStationTableArgs,
  GarbageFullStationTableModel,
} from './garbage-full-station-table.model';

@Injectable()
export class GarbageFullStationTableBusiness
  implements
    IBusiness<
      PagedList<GarbageStation>,
      PagedList<GarbageFullStationTableModel>
    >
{
  constructor(
    private storeService: GlobalStorageService,
    private stationService: GarbageStationRequestService,
    public converter: GarbageFullStationPagedTableConverter
  ) {}
  loading?: EventEmitter<void> | undefined;
  async load(
    index: number,
    size: number,
    args: GarbageFullStationTableArgs
  ): Promise<PagedList<GarbageFullStationTableModel>> {
    let division = await this.storeService.division.selected;
    let data = await this.getData(index, size, division.Id, args);
    let model = await this.converter.Convert(data);
    return model;
  }
  async getData(
    index: number,
    size: number,
    divisionId: string,
    args: GarbageFullStationTableArgs
  ): Promise<PagedList<GarbageStation>> {
    let params = new GetGarbageStationsParams();
    params.DryFull = true;
    params.DivisionId = divisionId;
    params.PageIndex = index;
    params.PageSize = size;
    params.Name = args.station;
    params.CommunityName = args.community;
    let stations = await this.stationService.list(params);
    if (stations.Data.length == 0) {
      return {
        Page: stations.Page,
        Data: [],
      };
    }
    return stations;
  }
}

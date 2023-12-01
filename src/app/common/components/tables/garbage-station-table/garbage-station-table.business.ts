import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';

import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { GarbageStationPagedConverter } from './garbage-station-table.converter';
import {
  GarbageStationTableArgs,
  GarbageStationTableModel,
} from './garbage-station-table.model';

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
    index: number,
    size: number,
    args: GarbageStationTableArgs
  ): Promise<PagedList<GarbageStationTableModel>> {
    let divisionId = args.divisionId;
    if (!divisionId) {
      divisionId = this.storeService.divisionId;
    }
    let data = await this.getData(index, size, divisionId, args);
    let model = await this.Converter.Convert(data);
    return model;
  }
  getData(
    index: number,
    size: number,
    divisionId: string,
    args: GarbageStationTableArgs
  ): Promise<PagedList<GarbageStation>> {
    let params = new GetGarbageStationsParams();
    params.PageIndex = index;
    params.PageSize = size;

    params.DivisionId = divisionId;
    if (args.stationId) {
      params.Ids = [args.stationId];
    }

    if (args.state != undefined) {
      if (args.state === 0) {
        params.StationState = args.state;
      } else {
        let state = '1';
        state = state.padEnd(args.state, '0');
        params.StationState = parseInt(state, 2);
      }
    }
    params.StationType = args.type;
    params.CommunityName = args.communityName;
    params.Name = args.stationName;
    if (args.opts) {
      (params as any)[args.opts.propertyName] = args.opts.text;
    }
    return this.stationService.list(params);
  }
}

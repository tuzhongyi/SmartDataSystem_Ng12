import { Injectable } from '@angular/core';
import { StationState } from 'src/app/enum/station-state.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { PagedParams } from 'src/app/network/request/IParams.interface';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { SearchOptions } from 'src/app/view-model/search-options.model';

@Injectable()
export class GarbageStationTableService {
  constructor(private service: GarbageStationRequestService) {}
  load(
    divisionId: string,
    page: PagedParams,
    opts?: SearchOptions,
    state?: StationState,
    stationId?: string
  ): Promise<PagedList<GarbageStation>> {
    let params = new GetGarbageStationsParams();
    params = Object.assign(params, page);
    if (opts) {
      (params as any)[opts.propertyName] = opts.text;
    }

    if (state != undefined) {
      // console.log(state);
      // let str = state.toString(2);
      // console.log(str);
      if (state === StationState.Normal) {
        params.StationState = StationState.Normal;
      } else {
        params.StationState = Math.pow(2, state - 1);
      }
    }

    params.DivisionId = divisionId;
    if (stationId) {
      params.Ids = [stationId];
    }

    return this.service.list(params);
  }

  all(
    divisionId: string,
    opts?: SearchOptions,
    state?: StationState,
    stationId?: string
  ) {
    let params = new GetGarbageStationsParams();

    if (opts) {
      (params as any)[opts.propertyName] = opts.text;
    }

    if (state != undefined) {
      if (state === StationState.Normal) {
        params.StationState = StationState.Normal;
      } else {
        params.StationState = Math.pow(2, state - 1);
      }
    }

    params.DivisionId = divisionId;
    if (stationId) {
      params.Ids = [stationId];
    }
    
    return this.service.all(params);
  }
}

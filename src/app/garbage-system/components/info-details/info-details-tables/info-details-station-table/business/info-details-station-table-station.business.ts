import { Injectable } from '@angular/core';
import {
  GetGarbageStationStatisticNumbersParams,
  GetGarbageStationsParams,
} from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { InfoDetailsStationTableArgs } from '../info-details-station-table.model';

@Injectable()
export class InfoDetailsStationTableStationBusiness {
  constructor(private service: GarbageStationRequestService) {}

  async statistic(args: InfoDetailsStationTableArgs) {
    let params = new GetGarbageStationStatisticNumbersParams();
    params.DivisionId = args.divisionId;
    let paged = await this.service.statistic.number.list(params);
    return paged.Data;
  }

  async array(args: InfoDetailsStationTableArgs) {
    let params = new GetGarbageStationsParams();
    params.DivisionId = args.divisionId;
    let paged = await this.service.cache.list(params);
    return paged.Data;
  }
}

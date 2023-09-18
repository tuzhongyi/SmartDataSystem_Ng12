import { Injectable } from '@angular/core';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class DapuqiaoGarbageStationWindowRecordBusiness {
  constructor(private service: GarbageStationRequestService) {}
  async stations(divisionId?: string) {
    let params = new GetGarbageStationsParams();
    params.DivisionId = divisionId;
    params.PageSize = 9999;
    let paged = await this.service.cache.list(params);
    return paged.Data;
  }
}

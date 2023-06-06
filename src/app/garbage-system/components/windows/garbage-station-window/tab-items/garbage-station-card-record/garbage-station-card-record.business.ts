import { Injectable } from '@angular/core';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class GarbageStationCardRecordBusiness {
  constructor(private service: GarbageStationRequestService) {}
  async first() {
    let params = new GetGarbageStationsParams();
    params.PageIndex = 1;
    params.PageSize = 1;
    let paged = await this.service.list(params);
    return paged.Data[0];
  }
}

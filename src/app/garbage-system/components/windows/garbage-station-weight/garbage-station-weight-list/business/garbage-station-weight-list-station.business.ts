import { Injectable } from '@angular/core';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class GarbageStationWeightListStationBusiness {
  constructor(private service: GarbageStationRequestService) {}

  async list(divisionId?: string): Promise<GarbageStation[]> {
    let params = new GetGarbageStationsParams();
    params.AncestorId = divisionId;
    let paged = await this.service.list(params);
    return paged.Data;
  }
}

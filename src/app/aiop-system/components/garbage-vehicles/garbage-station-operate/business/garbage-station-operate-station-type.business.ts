import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { GarbageStationType } from 'src/app/network/model/garbage-station.model';

import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class GarbageStationOperateStationTypeBusiness
  implements IBusiness<GarbageStationType[]>
{
  constructor(private service: GarbageStationRequestService) {}
  load(...args: any): Promise<GarbageStationType[]> {
    let data = this.getData();
    return data;
  }
  getData(...args: any): Promise<GarbageStationType[]> {
    return this.service.type.list();
  }
}

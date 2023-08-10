import { Injectable } from '@angular/core';
import { GetAIGarbageStationDevicesParams } from 'src/app/network/request/ai-garbage/ai-garbage.params';
import { AIGarbageRequestService } from 'src/app/network/request/ai-garbage/ai-garbage.service';
import { AIGarbageStationDeviceTableArgs } from './ai-garbage-station-device-table.model';

@Injectable()
export class AIGarbageStationDeviceTableBusiness {
  constructor(private service: AIGarbageRequestService) {}
  load(index: number, size: number, args: AIGarbageStationDeviceTableArgs) {
    return this.getData(index, size, args);
  }

  private getData(
    index: number,
    size: number,
    args: AIGarbageStationDeviceTableArgs
  ) {
    let params = new GetAIGarbageStationDevicesParams();
    params.PageIndex = index;
    params.PageSize = size;
    params.Asc = args.asc;
    params.Desc = args.desc;
    params.GarbageStationName = args.name;
    if (args.regionId) {
      params.RegionIds = [args.regionId];
    }
    return this.service.device.list(params);
  }
}

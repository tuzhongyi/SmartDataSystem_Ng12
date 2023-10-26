import { Injectable } from '@angular/core';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetAIGarbageStationDevicesParams } from 'src/app/network/request/ai-garbage/ai-garbage.params';
import { AIGarbageStationDeviceTableConverter } from './ai-garbage-station-device-table.converter';
import { AIGarbageStationDeviceTableArgs } from './ai-garbage-station-device-table.model';
import { AIGarbageStationDeviceTableService } from './ai-garbage-station-device-table.service';

@Injectable()
export class AIGarbageStationDeviceTableBusiness {
  constructor(
    private converter: AIGarbageStationDeviceTableConverter,
    private service: AIGarbageStationDeviceTableService
  ) {}
  async load(
    index: number,
    size: number,
    args: AIGarbageStationDeviceTableArgs
  ) {
    let data = await this.getData(index, size, args);
    let paged = new PagedList<Promise<AIGarbageDevice>>();
    paged.Page = data.Page;
    paged.Data = data.Data.map((x) => this.converter.device(x));
    return paged;
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
    return this.service.ai.device.list(params);
  }
}

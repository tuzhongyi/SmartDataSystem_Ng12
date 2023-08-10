import { Injectable } from '@angular/core';
import { GetAIGarbageStationDeviceEventRecordsParams } from 'src/app/network/request/ai-garbage/ai-garbage.params';
import { AIGarbageRequestService } from 'src/app/network/request/ai-garbage/ai-garbage.service';
import { AIGarbageStationDeviceRecordEventTableArgs } from './ai-garbage-station-device-record-event-table.model';

@Injectable()
export class AIGarbageStationDeviceRecordEventTableBusiness {
  constructor(private service: AIGarbageRequestService) {}
  load(
    index: number,
    size: number,
    args: AIGarbageStationDeviceRecordEventTableArgs
  ) {
    return this.getData(index, size, args);
  }

  private getData(
    index: number,
    size: number,
    args: AIGarbageStationDeviceRecordEventTableArgs
  ) {
    let params = new GetAIGarbageStationDeviceEventRecordsParams();
    params.PageIndex = index;
    params.PageSize = size;
    params.BeginTime = args.duration.begin;
    params.EndTime = args.duration.end;
    params.Asc = args.asc;
    params.Desc = args.desc;
    switch (args.searchType) {
      case 0:
        params.GarbageStationName = args.name;
        break;
      case 1:
        params.RegionName = args.name;
        break;
      default:
        break;
    }

    if (args.regionId) {
      params.RegionIds = [args.regionId];
    }
    params.EventType = args.eventType;
    return this.service.device.records.events.list(params);
  }
}

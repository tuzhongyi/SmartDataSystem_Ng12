import { Injectable } from '@angular/core';
import { GetAIGarbageStationDeviceCommandRecordsParams } from 'src/app/network/request/ai-garbage/ai-garbage.params';
import { AIGarbageRequestService } from 'src/app/network/request/ai-garbage/ai-garbage.service';
import { AIGarbageStationDeviceRecordCommandTableArgs } from './ai-garbage-station-device-record-command-table.model';

@Injectable()
export class AIGarbageStationDeviceRecordCommandTableBusiness {
  constructor(private service: AIGarbageRequestService) {}
  load(
    index: number,
    size: number,
    args: AIGarbageStationDeviceRecordCommandTableArgs
  ) {
    return this.getData(index, size, args);
  }

  private getData(
    index: number,
    size: number,
    args: AIGarbageStationDeviceRecordCommandTableArgs
  ) {
    let params = new GetAIGarbageStationDeviceCommandRecordsParams();
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

    if (args.command) {
      params.CommandIds = [args.command];
    }

    params.Result = args.result;

    return this.service.device.records.commands.list(params);
  }
}

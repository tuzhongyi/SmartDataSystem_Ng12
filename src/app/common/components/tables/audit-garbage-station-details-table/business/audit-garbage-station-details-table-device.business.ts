import { Injectable } from '@angular/core';
import { GetAIGarbageStationDevicesParams } from 'src/app/network/request/ai-garbage/ai-garbage.params';
import { AIGarbageDevicesRequestService } from 'src/app/network/request/ai-garbage/garbage-device.service';

@Injectable()
export class AuditGarbageStationDetailsTableDeviceBusiness {
  constructor(private service: AIGarbageDevicesRequestService) {}

  load(stationIds: string[]) {
    let params = new GetAIGarbageStationDevicesParams();
    params.GarbageStationIds = stationIds;
    return this.service.all(params);
  }
}

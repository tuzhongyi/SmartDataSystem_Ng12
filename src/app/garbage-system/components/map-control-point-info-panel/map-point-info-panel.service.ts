import { Injectable } from '@angular/core';
import { AIGarbageDevicesRequestService } from 'src/app/network/request/ai-garbage/garbage-device.service';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class MapPointInfoPanelService {
  constructor(
    public station: GarbageStationRequestService,
    public division: DivisionRequestService,
    public device: AIGarbageDevicesRequestService
  ) {}
}

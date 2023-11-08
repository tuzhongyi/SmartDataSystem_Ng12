import { Injectable } from '@angular/core';
import { AIGarbageRequestService } from 'src/app/network/request/ai-garbage/ai-garbage.service';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class AIGarbageStationDeviceTableService {
  constructor(
    public ai: AIGarbageRequestService,
    public station: GarbageStationRequestService
  ) {}
}
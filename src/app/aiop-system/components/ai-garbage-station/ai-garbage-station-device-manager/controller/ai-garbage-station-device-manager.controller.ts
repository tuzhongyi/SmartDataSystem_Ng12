import { Injectable } from '@angular/core';
import { AIGarbageStationDeviceManagerDivisionController } from './ai-garbage-station-device-manager-division.controller';
import { AIGarbageStationDeviceManagerStatusController } from './ai-garbage-station-device-manager-status.controller';

@Injectable()
export class AIGarbageStationDeviceManagerController {
  constructor(
    public division: AIGarbageStationDeviceManagerDivisionController,
    public status: AIGarbageStationDeviceManagerStatusController
  ) {}
}

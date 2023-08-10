import { Injectable } from '@angular/core';
import { AIGarbageDeviceCommand } from 'src/app/network/model/ai-garbage/garbage-device-command.enum';
import { AIGarbageRequestService } from 'src/app/network/request/ai-garbage/ai-garbage.service';

@Injectable()
export class AIGarbageStationDeviceCommandBusiness {
  constructor(private service: AIGarbageRequestService) {}

  command(id: string, command: AIGarbageDeviceCommand) {
    return this.service.device.command(id, command);
  }
  get(id: string) {
    return this.service.device.get(id);
  }
}

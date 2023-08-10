import { Injectable } from '@angular/core';
import {
  AIGarbageDeviceCommand,
  AIGarbageDeviceCommandNo,
} from 'src/app/network/model/ai-garbage/garbage-device-command.enum';
import { AIGarbageRequestService } from 'src/app/network/request/ai-garbage/ai-garbage.service';

@Injectable()
export class AIGarbageStationDeviceDropWindowBusiness {
  constructor(private service: AIGarbageRequestService) {}

  command(id: string, number: number) {
    let cmd = new AIGarbageDeviceCommand();
    cmd.CommandNo = AIGarbageDeviceCommandNo.WindowPowerOn;
    cmd.Parameter = number;
    return this.service.device.command(id, cmd);
  }
}

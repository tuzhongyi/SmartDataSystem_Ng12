import { Injectable } from '@angular/core';
import {
  AIGarbageDeviceCommand,
  AIGarbageDeviceCommandNo,
} from 'src/app/network/model/ai-garbage/garbage-device-command.enum';
import { AIGarbageDevicesRequestService } from 'src/app/network/request/ai-garbage/garbage-device.service';

@Injectable()
export class MapControlAIDeviceBusiness {
  constructor(private service: AIGarbageDevicesRequestService) {}

  command(id: string) {
    let command = new AIGarbageDeviceCommand();
    command.CommandNo = AIGarbageDeviceCommandNo.WindowPowerOn;
    command.Parameter = 1;
    return this.service.command(id, command);
  }
}

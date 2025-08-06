import { Injectable } from '@angular/core';
import {
  AIGarbageDeviceCommand,
  AIGarbageDeviceCommandNo,
} from 'src/app/network/model/ai-garbage/garbage-device-command.enum';
import { ForwardMessage } from 'src/app/network/model/ai-garbage/message/forward-message.model';
import { AIGarbageRequestService } from 'src/app/network/request/ai-garbage/ai-garbage.service';
import { CustomPropertyArgs } from '../ai-garbage-station-device-session-manager.model';

@Injectable()
export class AIGarbageStationDeviceSessionDeviceBusiness {
  constructor(private service: AIGarbageRequestService) {}

  command(id: string) {
    let command = new AIGarbageDeviceCommand();
    command.CommandNo = AIGarbageDeviceCommandNo.GCHATCP;
    return this.service.device.command(id, command);
  }

  message(id: string, args: CustomPropertyArgs) {
    let message = new ForwardMessage();
    message.Method = args.method;
    message.RelativeUrl = args.url;
    message.Content = args.body;
    if (args.body) {
      message.ContentType = args.type;
    }
    return this.service.device.message.forward(id, message);
  }

  get(id: string) {
    return this.service.device.get(id);
  }
}

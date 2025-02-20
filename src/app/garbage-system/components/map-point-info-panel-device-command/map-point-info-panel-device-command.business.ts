import { Injectable } from '@angular/core';
import { AIGarbageDeviceCommandNo } from 'src/app/network/model/ai-garbage/garbage-device-command.enum';
import { DeviceCommand } from 'src/app/network/model/garbage-station/device-command.model';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class MapPointInfoPanelDeviceCommandBusiness {
  constructor(private service: GarbageStationRequestService) {}

  command(id: string, _command: AIGarbageDeviceCommandNo) {
    let command = new DeviceCommand();
    command.CommandNo = _command;
    command.Parameter = 1;
    return this.service.device.command(id, command);
  }
}

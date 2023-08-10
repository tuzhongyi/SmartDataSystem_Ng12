import { Injectable } from '@angular/core';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';
import { AIGarbageRequestService } from 'src/app/network/request/ai-garbage/ai-garbage.service';

@Injectable()
export class AIGarbageStationDeviceDetailsBusiness {
  constructor(private service: AIGarbageRequestService) {}

  update(device: AIGarbageDevice) {
    let model: AIGarbageDevice = new AIGarbageDevice();
    model = Object.assign(model, device);
    model.UpdateTime = new Date();
    model.Cameras = undefined;
    model.Capabilities = undefined;
    model.CreationTime = undefined;
    model.DropWindows = undefined;
    model.Schedule = undefined;
    model.Status = undefined;
    return this.service.device.update(model);
  }
}

import { EventEmitter, Injectable } from '@angular/core';
import { AiGarbageStationDeviceStatusFilterModel } from '../../ai-garbage-station-device-status-filter/ai-garbage-station-device-status-filter.model';

@Injectable()
export class AIGarbageStationDeviceManagerStatusController {
  select = new EventEmitter<AiGarbageStationDeviceStatusFilterModel>();
  show = false;
  value = new AiGarbageStationDeviceStatusFilterModel();

  onchange() {
    this.select.emit(this.value);
  }
}

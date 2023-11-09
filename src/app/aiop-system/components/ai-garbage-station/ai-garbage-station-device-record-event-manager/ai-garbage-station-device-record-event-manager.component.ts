import { Component, EventEmitter, OnInit } from '@angular/core';
import { AIGarbageStationDeviceRecordEventTableArgs } from 'src/app/common/components/tables/ai-garbage-station-tables/ai-garbage-station-device-record-event-table/ai-garbage-station-device-record-event-table.model';
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { Language } from 'src/app/common/tools/language';
import { AIGarbageDeviceEventType } from 'src/app/network/model/ai-garbage/device-event-record.model';

@Component({
  selector: 'app-ai-garbage-station-device-record-event-manager',
  templateUrl:
    './ai-garbage-station-device-record-event-manager.component.html',
  styleUrls: [
    './ai-garbage-station-device-record-event-manager.component.less',
  ],
  providers: [],
})
export class AIGarbageStationDeviceRecordEventManagerComponent
  implements OnInit
{
  constructor() {}

  args: AIGarbageStationDeviceRecordEventTableArgs =
    new AIGarbageStationDeviceRecordEventTableArgs();
  load: EventEmitter<AIGarbageStationDeviceRecordEventTableArgs> =
    new EventEmitter();

  types: AIGarbageDeviceEventType[] = [];
  Language = Language;
  DateTimePickerView = DateTimePickerView;
  ngOnInit(): void {
    this.init();
  }

  init() {
    for (
      let i = AIGarbageDeviceEventType.PneumaticPumpPowerOff;
      i <= AIGarbageDeviceEventType.FanClose;
      i++
    ) {
      this.types.push(i);
    }
  }

  onsearch(value: string) {
    this.args.name = value;
    this.args.tofirst = true;
    this.load.emit(this.args);
  }
  oneventtype() {
    this.args.tofirst = true;
    this.load.emit(this.args);
  }
  ondate() {
    this.args.tofirst = true;
    this.load.emit(this.args);
  }
}

import { Component, EventEmitter, OnInit } from '@angular/core';
import { AIGarbageStationDeviceRecordCommandTableArgs } from 'src/app/common/components/tables/ai-garbage-station-tables/ai-garbage-station-device-record-command-table/ai-garbage-station-device-record-command-table.model';
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { Language } from 'src/app/common/tools/language';

@Component({
  selector: 'app-ai-garbage-station-device-record-command-manager',
  templateUrl:
    './ai-garbage-station-device-record-command-manager.component.html',
  styleUrls: [
    './ai-garbage-station-device-record-command-manager.component.less',
  ],
  providers: [],
})
export class AIGarbageStationDeviceRecordCommandManagerComponent
  implements OnInit
{
  constructor() {}

  args: AIGarbageStationDeviceRecordCommandTableArgs =
    new AIGarbageStationDeviceRecordCommandTableArgs();
  load: EventEmitter<AIGarbageStationDeviceRecordCommandTableArgs> =
    new EventEmitter();

  Language = Language;
  DateTimePickerView = DateTimePickerView;

  ngOnInit(): void {}

  onsearch(value: string) {
    this.args.name = value;
    this.load.emit(this.args);
  }
  onargschange() {
    this.load.emit(this.args);
  }
}

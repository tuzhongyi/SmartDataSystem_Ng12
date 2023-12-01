import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimeModel } from 'src/app/common/components/time-control/time-control.model';

@Component({
  selector: 'ai-garbage-station-device-schedule-spray',
  templateUrl: './ai-garbage-station-device-schedule-spray.component.html',
  styleUrls: ['./ai-garbage-station-device-schedule-spray.component.less'],
})
export class AiGarbageStationDeviceScheduleSprayComponent implements OnInit {
  @Input() models?: TimeModel[];
  @Output() modelsChange: EventEmitter<TimeModel[]> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    if (!this.models) {
      this.models = [];
    }
  }
  onremove(index: number) {
    if (this.models) {
      this.models.splice(index, 1);
    }
  }

  oncreate() {
    if (this.models) {
      this.models.push(new TimeModel(8, 0, 0));
    }
  }
}

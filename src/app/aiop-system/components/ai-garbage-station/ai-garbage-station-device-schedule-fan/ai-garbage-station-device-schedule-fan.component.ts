import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimeModel } from 'src/app/common/components/time-control/time-control.model';
import { AIGarbageTimeSegmentModel } from '../ai-garbage-station-device-schedule/ai-garbage-station-device-schedule.model';

@Component({
  selector: 'ai-garbage-station-device-schedule-fan',
  templateUrl: './ai-garbage-station-device-schedule-fan.component.html',
  styleUrls: ['./ai-garbage-station-device-schedule-fan.component.less'],
})
export class AiGarbageStationDeviceScheduleFanComponent implements OnInit {
  @Input() models?: AIGarbageTimeSegmentModel[];
  @Output() modelsChange: EventEmitter<AIGarbageTimeSegmentModel[]> =
    new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    if (!this.models) {
      this.models = [];
    }
  }

  onremove(index: number) {
    if (this.models) {
      this.models.splice(index, 1);
      this.modelsChange.emit(this.models);
    }
  }

  oncreate() {
    if (this.models) {
      let _new = new AIGarbageTimeSegmentModel();
      _new.StartTime = new TimeModel(8, 0, 0);
      _new.StopTime = new TimeModel(16, 0, 0);
      this.models.push(_new);
      this.modelsChange.emit(this.models);
    }
  }
}

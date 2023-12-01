import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimeModel } from 'src/app/common/components/time-control/time-control.model';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { DropWindow } from 'src/app/network/model/garbage-station/drop-window.model';
import {
  AIGarbageDayTimeSegmentModel,
  AIGarbageTimeSegmentModel,
} from '../ai-garbage-station-device-schedule/ai-garbage-station-device-schedule.model';
import { DropWindowSelection } from './ai-garbage-station-device-schedule-door.model';

@Component({
  selector: 'ai-garbage-station-device-schedule-door',
  templateUrl: './ai-garbage-station-device-schedule-door.component.html',
  styleUrls: ['./ai-garbage-station-device-schedule-door.component.less'],
})
export class AiGarbageStationDeviceScheduleDoorComponent implements OnInit {
  @Input() windows?: DropWindow[];
  @Input() models?: AIGarbageDayTimeSegmentModel[];
  @Output() modelsChange: EventEmitter<AIGarbageDayTimeSegmentModel[]> =
    new EventEmitter();
  constructor() {}
  week: number = 0;

  SelectStrategy = SelectStrategy;
  selection = new DropWindowSelection();
  ngOnInit(): void {
    if (!this.models || this.models.length === 0) {
      this.models = [];
      for (let i = 0; i < 7; i++) {
        let week = new AIGarbageDayTimeSegmentModel();
        week.Day = i;
        this.models.push(week);
      }
    }
  }
  onremove(index: number) {
    if (this.models) {
      this.models[this.week].Segments?.splice(index, 1);
      this.modelsChange.emit(this.models);
    }
  }
  oncreate() {
    if (this.models) {
      if (!this.models[this.week].Segments) {
        this.models[this.week].Segments = [];
      }
      let _new = new AIGarbageTimeSegmentModel();
      _new.StartTime = new TimeModel(8, 0, 0);
      _new.StopTime = new TimeModel(16, 0, 0);
      this.models[this.week].Segments?.push(_new);
      this.modelsChange.emit(this.models);
    }
  }
}

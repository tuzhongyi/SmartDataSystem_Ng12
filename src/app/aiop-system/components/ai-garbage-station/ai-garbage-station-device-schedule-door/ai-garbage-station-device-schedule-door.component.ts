import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TimeModel } from 'src/app/common/components/time-control/time-control.model';
import { Language } from 'src/app/common/tools/language';
import { DropWindow } from 'src/app/network/model/garbage-station/drop-window.model';
import {
  AIGarbageDayTimeSegmentModel,
  AIGarbageTimeSegmentModel,
} from '../ai-garbage-station-device-schedule/ai-garbage-station-device-schedule.model';
import { WeekSelectionWindow } from './ai-garbage-station-device-schedule-door.model';

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
  constructor(private toastr: ToastrService) {
    this.weeks = [0, 1, 2, 3, 4, 5, 6];
  }
  week: number = 0;
  weeks: number[] = [];
  Language = Language;
  window = new WeekSelectionWindow();
  ngOnInit(): void {
    if (!this.models || this.models.length === 0) {
      this.models = [];
      for (let i = 0; i < this.weeks.length; i++) {
        let week = new AIGarbageDayTimeSegmentModel();
        week.Day = this.weeks[i];
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
  tocopy() {
    this.window.current = this.week;
    this.window.show = true;
  }
  onall() {
    this.window.weeks = [];
    for (let i = 0; i < this.weeks.length; i++) {
      const week = this.weeks[i];
      if (week === this.week) continue;
      this.window.weeks.push(week);
    }
  }
  onweek(week: number) {
    let index = this.window.weeks.indexOf(week);
    if (index < 0) {
      this.window.weeks.push(week);
    } else {
      this.window.weeks.splice(index, 1);
    }
  }
  oncopy() {
    if (this.models) {
      let current = this.models[this.week].Segments;
      let success = false;
      for (let i = 0; i < this.window.weeks.length; i++) {
        let week = this.window.weeks[i];
        if (week === this.week) continue;
        this.models[week].Segments = current;
        success = true;
      }
      if (success) {
        this.toastr.success('复制成功');
        this.window.show = false;
      }
    }
  }
}

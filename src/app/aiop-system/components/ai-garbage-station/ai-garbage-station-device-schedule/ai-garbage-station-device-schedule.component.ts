import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimeModel } from 'src/app/common/components/time-control/time-control.model';
import { MessageBar } from 'src/app/common/tools/message-bar';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';

import { AIGarbageStationDeviceScheduleBusiness } from './ai-garbage-station-device-schedule.business';
import {
  AIGarbageScheduleModel,
  AIGarbageStationDeviceScheduleType,
  AIGarbageTimeSegmentModel,
} from './ai-garbage-station-device-schedule.model';

@Component({
  selector: 'app-ai-garbage-station-device-schedule',
  templateUrl: './ai-garbage-station-device-schedule.component.html',
  styleUrls: [
    '../../../../../assets/less/confirm.less',
    './ai-garbage-station-device-schedule.component.less',
  ],
  providers: [AIGarbageStationDeviceScheduleBusiness],
})
export class AIGarbageStationDeviceScheduleComponent implements OnInit {
  @Input()
  model?: AIGarbageDevice;
  @Output()
  ok: EventEmitter<AIGarbageDevice> = new EventEmitter();
  @Output()
  cancel: EventEmitter<void> = new EventEmitter();

  constructor(private business: AIGarbageStationDeviceScheduleBusiness) {}

  type = AIGarbageStationDeviceScheduleType.fan;
  ScheduleType = AIGarbageStationDeviceScheduleType;

  schedule?: AIGarbageScheduleModel;

  ngOnInit(): void {
    if (this.model && this.model.Schedule) {
      console.log(this.model.Schedule);
      this.schedule = this.business.tomodel(this.model.Schedule);
    }
  }

  onupdate() {
    if (this.model && this.schedule && this.schedule) {
      this.business
        .update(this.model.Id, this.model.Secret, this.schedule)
        .then((x) => {
          MessageBar.response_success('操作成功');
          this.ok.emit();
        })
        .catch((x) => {
          MessageBar.response_Error('操作失败');
          console.error(x);
        });
    }
  }
  onremove(index: number) {
    if (this.schedule) {
      switch (this.type) {
        case AIGarbageStationDeviceScheduleType.fan:
          this.schedule.ExhaustFanTimeSegments?.splice(index, 1);
          break;
        case AIGarbageStationDeviceScheduleType.spray:
          this.schedule.SprayTimes?.splice(index, 1);
          break;
        default:
          break;
      }
    }
  }
  onclose() {
    this.cancel.emit();
  }
  oncreate() {
    if (this.schedule) {
      switch (this.type) {
        case AIGarbageStationDeviceScheduleType.fan:
          if (!this.schedule.ExhaustFanTimeSegments) {
            this.schedule.ExhaustFanTimeSegments = [];
          }
          let _new = new AIGarbageTimeSegmentModel();
          _new.StartTime = new TimeModel(8, 0, 0);
          _new.StopTime = new TimeModel(16, 0, 0);
          this.schedule.ExhaustFanTimeSegments.push(_new);
          break;
        case AIGarbageStationDeviceScheduleType.spray:
          if (!this.schedule.SprayTimes) {
            this.schedule.SprayTimes = [];
          }
          this.schedule.SprayTimes.push(new TimeModel(8, 0, 0));
          break;

        default:
          break;
      }
    }
  }
}

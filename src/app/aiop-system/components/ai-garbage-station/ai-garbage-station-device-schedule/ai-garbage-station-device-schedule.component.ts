import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageBar } from 'src/app/common/tools/message-bar';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';

import { AIGarbageStationDeviceScheduleBusiness } from './ai-garbage-station-device-schedule.business';
import {
  AIGarbageScheduleModel,
  AIGarbageStationDeviceScheduleType,
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
  onclose() {
    this.cancel.emit();
  }
}

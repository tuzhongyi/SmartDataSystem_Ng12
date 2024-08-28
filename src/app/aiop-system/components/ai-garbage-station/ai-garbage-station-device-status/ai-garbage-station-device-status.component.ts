import { Component, Input, OnInit } from '@angular/core';
import { isEmpty } from 'src/app/common/tools/tool';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';
import { GCHAStatus } from 'src/app/network/model/ai-garbage/gcha-status.model';
import { RobotStatus } from 'src/app/network/model/ai-garbage/robot-status.model';

@Component({
  selector: 'ai-garbage-station-device-status',
  templateUrl: './ai-garbage-station-device-status.component.html',
  styleUrls: ['./ai-garbage-station-device-status.component.less'],
})
export class AiGarbageStationDeviceStatusComponent implements OnInit {
  @Input() model?: AIGarbageDevice;
  constructor() {}

  robots?: RobotStatus[];
  gcha?: GCHAStatus;

  get isrobot() {
    return (
      this.model &&
      this.model.Status &&
      this.model.Status.Robots &&
      this.model.Status.Robots.length > 0
    );
  }
  get isgcha() {
    return (
      this.model &&
      this.model.Status &&
      this.model.Status.GCHAStatus &&
      !isEmpty(this.model.Status.GCHAStatus)
    );
  }

  ngOnInit(): void {
    this.robots = this.model?.Status?.Robots;
    this.gcha = this.model?.Status?.GCHAStatus;
  }
}

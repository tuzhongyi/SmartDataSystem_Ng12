import { Component, Input, OnInit } from '@angular/core';
import { ColorTool } from 'src/app/common/tools/color-tool/color.tool';
import { Guid } from 'src/app/common/tools/guid';
import { Language } from 'src/app/common/tools/language';
import { RobotState } from 'src/app/enum/ai-garbage/robot-state.enum';
import { GarbageDeviceData } from 'src/app/network/model/garbage-station/garbage-device-data.model';
import { GarbageStationRobotStatus } from 'src/app/network/model/garbage-station/robot-status.model';
import { GarbageStationSortationStatus } from 'src/app/network/model/garbage-station/sortation-status.model';

@Component({
  selector: 'map-point-info-panel-device',
  templateUrl: './map-point-info-panel-device.component.html',
  styleUrls: ['./map-point-info-panel-device.component.less'],
})
export class MapPointInfoPanelDeviceComponent implements OnInit {
  @Input() data?: GarbageDeviceData;
  @Input() stationId?: string;
  @Input() nb?: {
    NBHeartbeatTime?: Date;
    NBState?: number;
  };
  constructor() {}

  Language = Language;
  Color = ColorTool;

  ngOnInit(): void {
    // console.log(this.data);
    // if (this.data) {
    //   this.data.Robots = [this.test.robot(), this.test.robot()];
    //   this.data.Sortations = [this.test.sortation()];
    // }
  }

  test = {
    robot: () => {
      let robot = new GarbageStationRobotStatus();
      robot.Id = '111';
      robot.BatteryLevel = 1;
      robot.BatteryState = 0;
      robot.Model = 'robot.Model';
      robot.SerialNumber = 'robot.SerialNumber';
      robot.State = [RobotState.Busy];
      return robot;
    },
    sortation: () => {
      let sortation = new GarbageStationSortationStatus();
      sortation.Id = Guid.NewGuid().ToString('N');
      sortation.Name = 'sortation.Name';
      sortation.OnlineState = 0;
      sortation.AirPressure = 0.5;
      return sortation;
    },
  };
}

import { Component, Input, OnInit } from '@angular/core';
import { ColorTool } from 'src/app/common/tools/color-tool/color.tool';
import { Language } from 'src/app/common/tools/language';
import { GarbageStationRobotStatus } from 'src/app/network/model/garbage-station/robot-status.model';

@Component({
  selector: 'map-point-info-panel-device-robot',
  templateUrl: './map-point-info-panel-device-robot.component.html',
  styleUrls: [
    '../map-point-info-panel-device/map-point-info-panel-device-panel.less',
    './map-point-info-panel-device-robot.component.less',
  ],
})
export class MapPointInfoPanelDeviceRobotComponent implements OnInit {
  @Input() data?: GarbageStationRobotStatus;
  @Input() index: number = 0;
  @Input() length: number = 0;
  constructor() {}
  Language = Language;
  Color = ColorTool;
  ngOnInit(): void {}
}

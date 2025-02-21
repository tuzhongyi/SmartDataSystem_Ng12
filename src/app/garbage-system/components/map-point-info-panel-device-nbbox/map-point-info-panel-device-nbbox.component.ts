import { Component, Input, OnInit } from '@angular/core';
import { ColorTool } from 'src/app/common/tools/color-tool/color.tool';
import { Language } from 'src/app/common/tools/language';

@Component({
  selector: 'map-point-info-panel-device-nbbox',
  templateUrl: './map-point-info-panel-device-nbbox.component.html',
  styleUrls: [
    '../map-point-info-panel-device/map-point-info-panel-device-panel.less',
    './map-point-info-panel-device-nbbox.component.less',
  ],
})
export class MapPointInfoPanelDeviceNBBoxComponent implements OnInit {
  @Input() data?: {
    NBHeartbeatTime?: Date;
    NBState?: number;
  };
  constructor() {}

  Language = Language;
  Color = ColorTool;
  ngOnInit(): void {}
}

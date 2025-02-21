import { Component, Input, OnInit } from '@angular/core';
import { ColorTool } from 'src/app/common/tools/color-tool/color.tool';
import { Language } from 'src/app/common/tools/language';
import { GCHAStatus } from 'src/app/network/model/ai-garbage/gcha-status.model';

@Component({
  selector: 'map-point-info-panel-device-gcha',
  templateUrl: './map-point-info-panel-device-gcha.component.html',
  styleUrls: [
    '../map-point-info-panel-device/map-point-info-panel-device-panel.less',
    './map-point-info-panel-device-gcha.component.less',
  ],
})
export class MapPointInfoPanelDeviceGCHAComponent implements OnInit {
  @Input() data?: GCHAStatus;
  constructor() {}
  Language = Language;
  Color = ColorTool;
  ngOnInit(): void {}
}

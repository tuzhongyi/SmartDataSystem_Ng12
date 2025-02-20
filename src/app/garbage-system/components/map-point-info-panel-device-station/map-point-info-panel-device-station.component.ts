import { Component, Input, OnInit } from '@angular/core';
import { ColorTool } from 'src/app/common/tools/color-tool/color.tool';
import { Language } from 'src/app/common/tools/language';
import { GarbageDeviceData } from 'src/app/network/model/garbage-station/garbage-device-data.model';

@Component({
  selector: 'map-point-info-panel-device-station',
  templateUrl: './map-point-info-panel-device-station.component.html',
  styleUrls: ['./map-point-info-panel-device-station.component.less'],
})
export class MapPointInfoPanelDeviceStationComponent implements OnInit {
  @Input() data?: GarbageDeviceData;
  constructor() {}

  Language = Language;
  Color = ColorTool;
  ngOnInit(): void {}
}

import { Component, Input, OnInit } from '@angular/core';
import { ColorTool } from 'src/app/common/tools/color-tool/color.tool';
import { Language } from 'src/app/common/tools/language';
import { GarbageStationSortationStatus } from 'src/app/network/model/garbage-station/sortation-status.model';

@Component({
  selector: 'map-point-info-panel-device-sortation',
  templateUrl: './map-point-info-panel-device-sortation.component.html',
  styleUrls: ['./map-point-info-panel-device-sortation.component.less'],
})
export class MapPointInfoPanelDeviceSortationComponent implements OnInit {
  @Input() datas?: GarbageStationSortationStatus[] = [];
  constructor() {}

  Language = Language;
  Color = ColorTool;
  ngOnInit(): void {}
}

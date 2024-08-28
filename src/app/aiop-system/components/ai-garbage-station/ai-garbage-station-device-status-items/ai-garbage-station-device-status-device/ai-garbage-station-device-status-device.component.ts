import { Component, Input, OnInit } from '@angular/core';

import { ColorTool } from 'src/app/common/tools/color-tool/color.tool';
import { Language } from 'src/app/common/tools/language';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';

@Component({
  selector: 'ai-garbage-station-device-status-device',
  templateUrl: './ai-garbage-station-device-status-device.component.html',
  styleUrls: ['./ai-garbage-station-device-status-device.component.less'],
})
export class AiGarbageStationDeviceStatusDeviceComponent implements OnInit {
  @Input() model?: AIGarbageDevice;
  constructor() {}

  Color = ColorTool;
  Language = Language;
  ngOnInit(): void {}
}

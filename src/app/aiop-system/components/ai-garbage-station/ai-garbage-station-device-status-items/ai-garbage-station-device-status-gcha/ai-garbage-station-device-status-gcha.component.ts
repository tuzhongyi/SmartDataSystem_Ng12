import { Component, Input, OnInit } from '@angular/core';

import { ColorTool } from 'src/app/common/tools/color-tool/color.tool';
import { Language } from 'src/app/common/tools/language';
import { isEmpty } from 'src/app/common/tools/tool';
import { GCHAStatus } from 'src/app/network/model/ai-garbage/gcha-status.model';

@Component({
  selector: 'ai-garbage-station-device-status-gcha',
  templateUrl: './ai-garbage-station-device-status-gcha.component.html',
  styleUrls: ['./ai-garbage-station-device-status-gcha.component.less'],
})
export class AiGarbageStationDeviceStatusGCHAComponent implements OnInit {
  @Input() gcha?: GCHAStatus;
  constructor() {}

  Color = ColorTool;
  Language = Language;
  isEmpty = isEmpty;

  ngOnInit(): void {}
}

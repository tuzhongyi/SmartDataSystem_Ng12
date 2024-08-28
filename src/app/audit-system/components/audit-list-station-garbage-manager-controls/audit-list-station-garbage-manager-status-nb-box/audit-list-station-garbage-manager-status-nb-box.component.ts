import { Component, Input, OnInit } from '@angular/core';
import { ColorTool } from 'src/app/common/tools/color-tool/color.tool';
import { IconTool } from 'src/app/common/tools/icon-tool/icon.tool';
import { Language } from 'src/app/common/tools/language';
import { NBStatus } from 'src/app/network/model/garbage-station/nb-box/nb-status.model';

@Component({
  selector: 'audit-list-station-garbage-manager-status-nb-box',
  templateUrl:
    './audit-list-station-garbage-manager-status-nb-box.component.html',
  styleUrls: [
    './audit-list-station-garbage-manager-status-nb-box.component.less',
  ],
})
export class AuditListStationGarbageManagerStatusNBBoxComponent
  implements OnInit
{
  @Input() nb?: NBStatus;
  constructor() {}

  Color = ColorTool;
  Icon = IconTool;
  Language = Language;

  ngOnInit(): void {}
}

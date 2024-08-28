import { Component, Input, OnInit } from '@angular/core';
import { IconTool } from 'src/app/common/tools/icon-tool/icon.tool';
import { Language } from 'src/app/common/tools/language';
import { EventType } from 'src/app/enum/event-type.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';

@Component({
  selector: 'audit-list-station-garbage-manager-event-disabled',
  templateUrl:
    './audit-list-station-garbage-manager-event-disabled.component.html',
  styleUrls: [
    './audit-list-station-garbage-manager-event-disabled.component.less',
  ],
})
export class AuditListStationGarbageManagerEventDisabledComponent
  implements OnInit
{
  @Input() model?: GarbageStation;

  constructor() {}

  datas: EventType[] = [];
  Language = Language;
  Icon = IconTool;

  ngOnInit(): void {
    if (this.model && this.model.Members) {
      this.datas = this.model.DisableEventTypes ?? [];
    }
  }
}

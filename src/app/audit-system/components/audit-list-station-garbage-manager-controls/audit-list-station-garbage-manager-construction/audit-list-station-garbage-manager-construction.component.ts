import { Component, Input, OnInit } from '@angular/core';
import { Language } from 'src/app/common/tools/language';
import { ConstructionData } from 'src/app/network/model/garbage-station/construction-data';

@Component({
  selector: 'audit-list-station-garbage-manager-construction',
  templateUrl:
    './audit-list-station-garbage-manager-construction.component.html',
  styleUrls: [
    './audit-list-station-garbage-manager-construction.component.less',
  ],
})
export class AuditListStationGarbageManagerConstructionComponent
  implements OnInit
{
  @Input() data?: ConstructionData;

  constructor() {}

  Language = Language;

  ngOnInit(): void {}
}

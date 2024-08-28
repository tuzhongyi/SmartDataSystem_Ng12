import { Component, Input, OnInit } from '@angular/core';
import { Language } from 'src/app/common/tools/language';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { Member } from 'src/app/network/model/garbage-station/member.model';

@Component({
  selector: 'audit-list-station-garbage-manager-tab-member',
  templateUrl: './audit-list-station-garbage-manager-tab-member.component.html',
  styleUrls: ['./audit-list-station-garbage-manager-tab-member.component.less'],
})
export class AuditListStationGarbageManagerTabMemberComponent
  implements OnInit
{
  @Input() model?: GarbageStation;

  constructor() {}

  datas: Member[] = [];
  Language = Language;

  ngOnInit(): void {
    if (this.model && this.model.Members) {
      this.datas = this.model.Members;
    }
  }
}

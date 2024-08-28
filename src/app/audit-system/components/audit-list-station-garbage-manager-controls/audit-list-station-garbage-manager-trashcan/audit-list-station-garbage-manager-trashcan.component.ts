import { Component, Input, OnInit } from '@angular/core';
import { Language } from 'src/app/common/tools/language';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { TrashCan } from 'src/app/network/model/garbage-station/trash-can.model';

@Component({
  selector: 'audit-list-station-garbage-manager-trashcan',
  templateUrl: './audit-list-station-garbage-manager-trashcan.component.html',
  styleUrls: ['./audit-list-station-garbage-manager-trashcan.component.less'],
})
export class AuditListStationGarbageManagerTrashcanComponent implements OnInit {
  @Input() model?: GarbageStation;

  constructor() {}

  datas: TrashCan[] = [];
  Language = Language;

  ngOnInit(): void {
    if (this.model && this.model.TrashCans) {
      this.datas = this.model.TrashCans.sort((a, b) => {
        return LocaleCompare.compare(a.No, b.No);
      });
    }
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { NBStatus } from 'src/app/network/model/garbage-station/nb-box/nb-status.model';
import { AuditListStationGarbageManagerNBBoxBusiness } from './audit-list-station-garbage-manager-nb-box.business';

@Component({
  selector: 'audit-list-station-garbage-manager-nb-box',
  templateUrl: './audit-list-station-garbage-manager-nb-box.component.html',
  styleUrls: ['./audit-list-station-garbage-manager-nb-box.component.less'],
  providers: [AuditListStationGarbageManagerNBBoxBusiness],
})
export class AuditListStationGarbageManagerNBBoxComponent implements OnInit {
  @Input() model?: GarbageStation;
  constructor(private business: AuditListStationGarbageManagerNBBoxBusiness) {}

  data?: NBStatus;

  ngOnInit(): void {
    if (this.model) {
      this.load(this.model.Id);
    }
  }

  load(stationId: string) {
    this.business.load(stationId).then((x) => {
      this.data = x;
    });
  }
}

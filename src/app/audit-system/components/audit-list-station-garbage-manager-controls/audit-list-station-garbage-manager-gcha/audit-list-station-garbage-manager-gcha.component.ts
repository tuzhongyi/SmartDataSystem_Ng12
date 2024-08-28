import { Component, Input, OnInit } from '@angular/core';
import { isEmpty } from 'src/app/common/tools/tool';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';
import { GCHAStatus } from 'src/app/network/model/ai-garbage/gcha-status.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { AuditListStationGarbageManagerGCHABusiness } from './audit-list-station-garbage-manager-gcha.business';

@Component({
  selector: 'audit-list-station-garbage-manager-gcha',
  templateUrl: './audit-list-station-garbage-manager-gcha.component.html',
  styleUrls: ['./audit-list-station-garbage-manager-gcha.component.less'],
  providers: [AuditListStationGarbageManagerGCHABusiness],
})
export class AuditListStationGarbageManagerGCHAComponent implements OnInit {
  @Input() model?: GarbageStation;
  constructor(private business: AuditListStationGarbageManagerGCHABusiness) {}

  data?: AIGarbageDevice;
  gcha?: GCHAStatus;

  has = {
    device: false,
    gcha: false,
  };

  ngOnInit(): void {
    if (this.model && this.model.GarbageDeviceData) {
      this.gcha = this.model.GarbageDeviceData.GCHAStatus;
      this.has.gcha = !isEmpty(this.gcha);
      this.load(this.model.GarbageDeviceData.DeviceId);
    }
  }

  load(deviceId: string) {
    this.business.load(deviceId).then((x) => {
      this.data = x;
      this.has.device = !isEmpty(this.data);
    });
  }
}

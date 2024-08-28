import { Component, Input, OnInit } from '@angular/core';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { AuditListStationGarbageManagerDeviceBusiness } from './audit-list-station-garbage-manager-device.business';

@Component({
  selector: 'audit-list-station-garbage-manager-device',
  templateUrl: './audit-list-station-garbage-manager-device.component.html',
  styleUrls: ['./audit-list-station-garbage-manager-device.component.less'],
  providers: [AuditListStationGarbageManagerDeviceBusiness],
})
export class AuditListStationGarbageManagerDeviceComponent implements OnInit {
  @Input() model?: GarbageStation;
  constructor(private business: AuditListStationGarbageManagerDeviceBusiness) {}

  device?: AIGarbageDevice;
  ngOnInit(): void {
    if (this.model && this.model.GarbageDeviceData) {
      this.load(this.model.GarbageDeviceData.DeviceId);
    }
  }

  load(deviceId: string) {
    this.business.load(deviceId).then((x) => {
      this.device = x;
    });
  }
}

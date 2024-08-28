import { Component, Input, OnInit } from '@angular/core';
import { isEmpty } from 'src/app/common/tools/tool';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { AuditListStationGarbageManagerCommandBusiness } from './audit-list-station-garbage-manager-command.business';

@Component({
  selector: 'audit-list-station-garbage-manager-command',
  templateUrl: './audit-list-station-garbage-manager-command.component.html',
  styleUrls: ['./audit-list-station-garbage-manager-command.component.less'],
  providers: [AuditListStationGarbageManagerCommandBusiness],
})
export class AuditListStationGarbageManagerCommandComponent implements OnInit {
  @Input() model?: GarbageStation;

  constructor(
    private business: AuditListStationGarbageManagerCommandBusiness
  ) {}
  data?: AIGarbageDevice;
  hasdevice = false;
  hasnbbox = false;
  hasgcha = false;
  ngOnInit(): void {
    if (this.model) {
      this.loadconfig(this.model);
      if (this.hasdevice && this.model.GarbageDeviceData) {
        this.load(this.model.GarbageDeviceData.DeviceId, this.model.Name);
      }
    }
  }

  load(id: string, name: string) {
    this.business.get(id).then((x) => {
      this.data = x;
      this.data.Name = name;
    });
  }

  loadconfig(model: GarbageStation) {
    this.hasnbbox = !isEmpty(model.NBState);
    this.hasdevice = !isEmpty(model.GarbageDeviceData);
    this.hasgcha = !isEmpty(model.GarbageDeviceData?.GCHAStatus);
  }
}

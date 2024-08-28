import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { AuditListStationGarbageManagerTabDropWindowBusiness } from './audit-list-station-garbage-manager-tab-drop-window.business';

@Component({
  selector: 'audit-list-station-garbage-manager-tab-drop-window',
  templateUrl:
    './audit-list-station-garbage-manager-tab-drop-window.component.html',
  styleUrls: [
    './audit-list-station-garbage-manager-tab-drop-window.component.less',
  ],
  providers: [AuditListStationGarbageManagerTabDropWindowBusiness],
})
export class AuditListStationGarbageManagerTabDropWindowComponent
  implements OnInit
{
  @Input() model?: GarbageStation;
  @Output() close: EventEmitter<void> = new EventEmitter();
  constructor(
    private business: AuditListStationGarbageManagerTabDropWindowBusiness
  ) {}

  data?: AIGarbageDevice;

  ngOnInit(): void {
    if (this.model && this.model.GarbageDeviceData) {
      this.load(this.model.GarbageDeviceData.DeviceId, this.model.Name);
    }
  }

  load(deviceId: string, name: string) {
    this.business.get(deviceId).then((x) => {
      this.data = x;
      this.data.Name = name;
    });
  }

  onclose() {
    this.close.emit();
  }
}

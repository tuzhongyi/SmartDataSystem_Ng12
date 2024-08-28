import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { AuditListStationGarbageManagerTabScheduleBusiness } from './audit-list-station-garbage-manager-tab-schedule.business';

@Component({
  selector: 'audit-list-station-garbage-manager-tab-schedule',
  templateUrl:
    './audit-list-station-garbage-manager-tab-schedule.component.html',
  styleUrls: [
    './audit-list-station-garbage-manager-tab-schedule.component.less',
  ],
  providers: [AuditListStationGarbageManagerTabScheduleBusiness],
})
export class AuditListStationGarbageManagerTabScheduleComponent
  implements OnInit
{
  @Input() model?: GarbageStation;
  @Output() ok: EventEmitter<GarbageStation> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  constructor(
    private business: AuditListStationGarbageManagerTabScheduleBusiness
  ) {}

  data?: AIGarbageDevice;

  ngOnInit(): void {
    if (this.model && this.model.GarbageDeviceData) {
      this.load(this.model.GarbageDeviceData.DeviceId, this.model.Name);
    }
  }

  load(id: string, name: string) {
    this.business.get(id).then((x) => {
      this.data = x;
      this.data.Name = name;
    });
  }

  oncancel() {
    this.cancel.emit();
  }
  onok() {
    if (this.model) {
      this.ok.emit(this.model);
    }
  }
}

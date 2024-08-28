import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { isEmpty, wait2 } from 'src/app/common/tools/tool';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';
import { GCHAStatus } from 'src/app/network/model/ai-garbage/gcha-status.model';
import { RobotStatus } from 'src/app/network/model/ai-garbage/robot-status.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { NBStatus } from 'src/app/network/model/garbage-station/nb-box/nb-status.model';
import { AuditListStationGarbageManagerStatusNBBoxBusiness } from './business/audit-list-station-garbage-manager-status-nb-box.business';
import { AuditListStationGarbageManagerStatusBusiness } from './business/audit-list-station-garbage-manager-status.business';

@Component({
  selector: 'audit-list-station-garbage-manager-status',
  templateUrl: './audit-list-station-garbage-manager-status.component.html',
  styleUrls: ['./audit-list-station-garbage-manager-status.component.less'],
  providers: [
    AuditListStationGarbageManagerStatusBusiness,
    AuditListStationGarbageManagerStatusNBBoxBusiness,
  ],
})
export class AuditListStationGarbageManagerStatusComponent
  implements OnInit, AfterViewInit
{
  @Input() model?: GarbageStation;
  constructor(private business: AuditListStationGarbageManagerStatusBusiness) {}

  device?: AIGarbageDevice;
  robots?: RobotStatus[];
  gcha?: GCHAStatus;
  nb?: NBStatus;

  isrobot = false;
  isgcha = false;

  @ViewChild('body') body?: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    if (this.model) {
      this.loadNBBox(this.model.Id);
      if (this.model.GarbageDeviceData) {
        this.loadDevice(this.model.GarbageDeviceData.DeviceId);
      }
    }
  }

  ngAfterViewInit(): void {
    wait2(() => {
      return !!(this.device && this.body);
    }).then(() => {
      if (this.body) {
        this.body.nativeElement.style.width = 'max-content';
      }
    });
  }

  loadDevice(deviceId: string) {
    this.business.device(deviceId).then((x) => {
      this.device = x;
      this.robots = this.device?.Status?.Robots;
      this.isrobot = !isEmpty(this.device.Status?.Robots);
      this.gcha = this.device?.Status?.GCHAStatus;
      this.isgcha = !isEmpty(this.device.Status?.GCHAStatus);
    });
  }
  loadNBBox(stationId: string) {
    this.business.nb.load(stationId).then((x) => {
      this.nb = x;
    });
  }
}

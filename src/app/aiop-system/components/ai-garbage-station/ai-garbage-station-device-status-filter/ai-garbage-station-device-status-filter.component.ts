import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { AiGarbageStationDeviceStatusFilterModel } from './ai-garbage-station-device-status-filter.model';

@Component({
  selector: 'ai-garbage-station-device-status-filter',
  templateUrl: './ai-garbage-station-device-status-filter.component.html',
  styleUrls: ['./ai-garbage-station-device-status-filter.component.less'],
})
export class AiGarbageStationDeviceStatusFilterComponent implements OnInit {
  @Input() status = new AiGarbageStationDeviceStatusFilterModel();
  @Output() statusChange =
    new EventEmitter<AiGarbageStationDeviceStatusFilterModel>();
  constructor() {}

  OnlineStatus = OnlineStatus;

  ngOnInit(): void {
    if (this.status) {
      if (this.status.device != undefined) {
        this.device = [this.status.device];
      }
      if (this.status.analysis != undefined) {
        this.analysis = [this.status.analysis];
      }
      if (this.status.gcha != undefined) {
        this.gcha = [this.status.gcha];
      }
    }
  }

  device = [OnlineStatus.Online, OnlineStatus.Offline];
  gcha = [OnlineStatus.Online, OnlineStatus.Offline];
  analysis = [OnlineStatus.Online, OnlineStatus.Offline];

  ondevicechange(value: OnlineStatus) {
    if (this.device.includes(value)) {
      this.device.splice(this.device.indexOf(value), 1);
    } else {
      this.device.push(value);
    }
    this.status.device = this.convert(this.device);
    this.statusChange.emit(this.status);
  }
  onanalysischange(value: OnlineStatus) {
    if (this.analysis.includes(value)) {
      this.analysis.splice(this.analysis.indexOf(value), 1);
    } else {
      this.analysis.push(value);
    }
    this.status.analysis = this.convert(this.analysis);
    this.statusChange.emit(this.status);
  }
  ongchachange(value: OnlineStatus) {
    if (this.gcha.includes(value)) {
      this.gcha.splice(this.gcha.indexOf(value), 1);
    } else {
      this.gcha.push(value);
    }
    this.status.gcha = this.convert(this.gcha);
    this.statusChange.emit(this.status);
  }

  convert(array: OnlineStatus[]) {
    if (array.length == 2) {
      return undefined;
    }
    return array[0];
  }
}

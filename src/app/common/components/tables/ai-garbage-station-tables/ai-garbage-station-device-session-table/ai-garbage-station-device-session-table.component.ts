import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { DeviceSession } from 'src/app/network/model/html2tcp/device-session.model';
import { LocalDevice } from 'src/app/network/model/html2tcp/local-device.model';
import { AIGarbageStationDeviceTableBusiness } from './ai-garbage-station-device-session-table.business';

@Component({
  selector: 'ai-garbage-station-device-session-table',
  templateUrl: './ai-garbage-station-device-session-table.component.html',
  styleUrls: [
    '../../table.less',
    './ai-garbage-station-device-session-table.component.less',
  ],
  providers: [AIGarbageStationDeviceTableBusiness],
})
export class AiGarbageStationDeviceSessionTableComponent implements OnInit {
  @Output() open = new EventEmitter<LocalDevice>();
  @Input() load?: EventEmitter<DeviceSession>;

  constructor(private business: AIGarbageStationDeviceTableBusiness) {}

  session?: DeviceSession;
  datas: LocalDevice[] = [];
  widths = ['15%', undefined, undefined, undefined, '15%', '15%'];

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((x) => {
        this.session = x;
        this.loadData(x);
      });
    }
  }

  loadData(session: DeviceSession) {
    this.business.load(session.DeviceId).then((x) => {
      this.datas = x;
    });
  }

  sortData(sort: Sort) {}

  onopen(item: LocalDevice) {
    this.open.emit(item);
  }
}

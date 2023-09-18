import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDeviceStateDes } from 'src/app/view-model/device-state-count.model';
import { DaPuQiaoMainStationCountIndex as MainStationCountIndex } from './main-station-count.model';

@Component({
  selector: 'main-station-count',
  templateUrl: './main-station-count.component.html',
  styleUrls: ['./main-station-count.component.less'],
})
export class MainStationCountComponent implements OnInit {
  @Input() load?: EventEmitter<void>;
  @Output() devicestateclick: EventEmitter<IDeviceStateDes> =
    new EventEmitter();
  constructor() {}

  index = MainStationCountIndex.device_state;
  Index = MainStationCountIndex;

  ngOnInit(): void {}

  ondevicestateclick(args: IDeviceStateDes) {
    this.devicestateclick.emit(args);
  }
}

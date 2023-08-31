import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDeviceStateDes } from 'src/app/view-model/device-state-count.model';
import { DaPuQiaoMainStationCountIndex } from './dapuqiao-main-station-count.model';

@Component({
  selector: 'dapuqiao-main-station-count',
  templateUrl: './dapuqiao-main-station-count.component.html',
  styleUrls: ['./dapuqiao-main-station-count.component.less'],
})
export class DaPuQiaoMainStationCountComponent implements OnInit {
  @Input() load?: EventEmitter<void>;
  @Output() devicestateclick: EventEmitter<IDeviceStateDes> =
    new EventEmitter();
  constructor() {}

  index = DaPuQiaoMainStationCountIndex.device_state;
  Index = DaPuQiaoMainStationCountIndex;

  ngOnInit(): void {}

  ondevicestateclick(args: IDeviceStateDes) {
    this.devicestateclick.emit(args);
  }
}

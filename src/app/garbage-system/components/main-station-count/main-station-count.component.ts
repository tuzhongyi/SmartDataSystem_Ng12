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

  @Input()
  public set index(v: MainStationCountIndex | undefined) {
    if (v === undefined) {
      if (this._index === MainStationCountIndex.station_count) {
        this._index = MainStationCountIndex.device_state;
      }
      return;
    }
    this._index = v;
  }
  private _index = MainStationCountIndex.device_state;
  public get index(): MainStationCountIndex {
    return this._index;
  }

  @Output() devicestateclick: EventEmitter<IDeviceStateDes> =
    new EventEmitter();
  constructor() {}

  Index = MainStationCountIndex;

  ngOnInit(): void {}

  ondevicestateclick(args: IDeviceStateDes) {
    this.devicestateclick.emit(args);
  }
}

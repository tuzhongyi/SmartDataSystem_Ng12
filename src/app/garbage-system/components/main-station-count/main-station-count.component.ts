import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { IDeviceStateDes } from 'src/app/view-model/device-state-count.model';
import { DaPuQiaoMainStationCountIndex as MainStationCountIndex } from './main-station-count.model';

@Component({
  selector: 'main-station-count',
  templateUrl: './main-station-count.component.html',
  styleUrls: ['./main-station-count.component.less'],
})
export class MainStationCountComponent implements OnInit {
  @Input() load?: EventEmitter<void>;

  @Input() public set index(v: MainStationCountIndex | undefined) {
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
  @Output() divisioninfo = new EventEmitter<Division>();
  constructor(private global: GlobalStorageService) {}

  division?: Division;

  Index = MainStationCountIndex;
  DivisionType = DivisionType;

  ngOnInit(): void {
    this.global.division.change.subscribe((x) => {
      this.division = x as Division;
      if (
        this.division &&
        this.division.DivisionType === DivisionType.Committees
      ) {
        this.index = MainStationCountIndex.device_state;
      }
    });
  }

  ondevicestateclick(args: IDeviceStateDes) {
    this.devicestateclick.emit(args);
  }
  ondivisioninfo(item: Division) {
    this.divisioninfo.emit(item);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { WindowComponent } from 'src/app/common/components/window-control/window.component';
import { EventRecordOperationFilterBusiness } from '../event-record-operation-filter.business';
import { GarbageStationWindowRecordBusiness } from './business/garbage-station-window-record.business';
import { GarbageStationWindowStationBusiness } from './business/garbage-station-window-station.business';

@Component({
  selector: 'howell-garbage-station-window',
  templateUrl: './garbage-station-window.component.html',
  styleUrls: ['./garbage-station-window.component.less'],
  providers: [
    GarbageStationWindowStationBusiness,
    EventRecordOperationFilterBusiness,
    GarbageStationWindowRecordBusiness,
  ],
})
export class GarbageStationWindowComponent
  extends WindowComponent
  implements OnInit
{
  @Input()
  index = GarbageStationWindowIndex.station;

  Index = GarbageStationWindowIndex;

  constructor(
    public station: GarbageStationWindowStationBusiness,
    public record: GarbageStationWindowRecordBusiness
  ) {
    super();
  }

  ngOnInit(): void {}

  indexChange(index: number) {
    this.index = index;
  }
}

export enum GarbageStationWindowIndex {
  /** 投放点列表 */
  station = 0,
  /** 小包垃圾滞留 */
  stay = 1,
  /** 总图表 */
  general = 2,
  /** 细分图表 */
  details = 3,
  /** 报警事件处置 */
  record = 4,
}

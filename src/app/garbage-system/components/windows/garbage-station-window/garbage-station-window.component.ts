import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ImageControlModel,
  ImageControlModelArray,
} from 'src/app/common/components/image-control/image-control.model';
import { GarbageDropRecordViewModel } from 'src/app/common/components/tables/garbage-drop-record-table/garbage-drop-record.model';
import { GarbageStationTableModel } from 'src/app/common/components/tables/garbage-station-table/garbage-station-table.model';
import { WindowComponent } from 'src/app/common/components/window-control/window.component';
import { GarbageStationGarbageCountStatistic } from 'src/app/network/model/garbage-station-sarbage-count-statistic.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { EventRecordOperationFilterBusiness } from '../event-record-operation-filter.business';
import { GarbageStationWindowRecordBusiness } from './business/garbage-station-window-record.business';
import { GarbageStationWindowStationBusiness } from './business/garbage-station-window-station.business';
import { GarbageStationWindowDetailsBusiness } from './tab-items/garbage-station-window-details/garbage-station-window-details.business';

@Component({
  selector: 'howell-garbage-station-window',
  templateUrl: './garbage-station-window.component.html',
  styleUrls: ['./garbage-station-window.component.less'],
  providers: [
    GarbageStationWindowStationBusiness,
    EventRecordOperationFilterBusiness,
    GarbageStationWindowRecordBusiness,
    GarbageStationWindowDetailsBusiness,
  ],
})
export class GarbageStationWindowComponent
  extends WindowComponent
  implements OnInit
{
  @Input()
  index = GarbageStationWindowIndex.station;
  @Input()
  stationId?: string;

  @Output()
  image: EventEmitter<ImageControlModelArray> = new EventEmitter();
  @Output()
  chartdblclick: EventEmitter<GarbageStationGarbageCountStatistic> = new EventEmitter();

  Index = GarbageStationWindowIndex;

  constructor(
    public station: GarbageStationWindowStationBusiness,
    public record: GarbageStationWindowRecordBusiness,
    public details: GarbageStationWindowDetailsBusiness
  ) {
    super();
  }

  ngOnInit(): void {}

  indexChange(index: number) {
    this.index = index;
  }

  onimage(item: ImageControlModelArray) {
    this.image.emit(item);
  }

  onstaydblclick(item: GarbageStationGarbageCountStatistic) {
    this.chartdblclick.emit(item);
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

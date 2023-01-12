import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  ImageControlModel,
  ImageControlModelArray,
} from 'src/app/view-model/image-control.model';
import {
  GarbageDropRecordFilter,
  GarbageDropRecordViewModel,
} from 'src/app/common/components/tables/garbage-drop-record-table/garbage-drop-record.model';
import { GarbageStationTableModel } from 'src/app/common/components/tables/garbage-station-table/garbage-station-table.model';
import { WindowComponent } from 'src/app/common/components/window-control/window.component';
import { GarbageStationGarbageCountStatistic } from 'src/app/network/model/garbage-station-sarbage-count-statistic.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { EventRecordOperationFilterBusiness } from '../event-record-operation-filter.business';
import { GarbageStationWindowRecordBusiness } from './business/garbage-station-window-record.business';
import { GarbageStationWindowStationBusiness } from './business/garbage-station-window-station.business';
import { GarbageStationWindowDetailsBusiness } from './tab-items/garbage-station-window-details/garbage-station-window-details.business';
import { EventType } from 'src/app/enum/event-type.enum';
import { GarbageTaskStatus } from 'src/app/enum/garbage-task-status.enum';

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
  implements OnInit, OnChanges
{
  @Input()
  index = GarbageStationWindowIndex.station;
  @Input()
  stationId?: string;
  @Input()
  divisionId?: string;
  @Input()
  taskStatus?: GarbageTaskStatus;

  @Output()
  image: EventEmitter<ImageControlModelArray> = new EventEmitter();
  @Output()
  chartdblclick: EventEmitter<GarbageStationGarbageCountStatistic> =
    new EventEmitter();
  @Output()
  position: EventEmitter<GarbageStation> = new EventEmitter();

  constructor(
    public station: GarbageStationWindowStationBusiness,
    public record: GarbageStationWindowRecordBusiness,
    public details: GarbageStationWindowDetailsBusiness
  ) {
    super();
  }

  Index = GarbageStationWindowIndex;
  isfilter = false;

  ngOnInit(): void {
    // console.log('ppp', this.eventType);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.eventType) {
      let filter = this.record.filter.filter as GarbageDropRecordFilter;
      // switch (this.eventType) {
      //   case EventType.GarbageDrop:
      //     filter.IsHandle = false;
      //     filter.IsTimeout = false;
      //     break;
      //   case EventType.GarbageDropHandle:
      //     filter.IsHandle = true;
      //     filter.IsTimeout = false;
      //     break;
      //   case EventType.GarbageDropTimeout:
      //   case EventType.GarbageDropSuperTimeout:
      //     filter.IsTimeout = true;
      //     break;
      //   case EventType.GarbageDropTimeoutHandle:
      //     filter.IsTimeout = true;
      //     filter.IsHandle = true;
      //     break;

      //   default:
      //     break;
      // }
    }
    if (changes.divisionId) {
      this.record.filter.filter.divisionId = this.divisionId;
    }
  }

  indexChange(index: number) {
    this.index = index;
    this.divisionId = undefined;
    this.stationId = undefined;
  }

  onimage(item: ImageControlModelArray) {
    this.image.emit(item);
  }

  onstaydblclick(item: GarbageStationGarbageCountStatistic) {
    this.chartdblclick.emit(item);
  }

  onposition(item: GarbageStation) {
    this.position.emit(item);
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

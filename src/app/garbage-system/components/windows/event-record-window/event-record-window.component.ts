import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  ImageControlModel,
  ImageControlModelArray,
} from 'src/app/common/components/image-control/image-control.model';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { EventRecordFilter, EventRecordViewModel } from 'src/app/common/components/tables/event-record-table/event-record.model';
import { WindowComponent } from 'src/app/common/components/window-control/window.component';
import { EventType } from 'src/app/enum/event-type.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { EventRecordOperationFilterBusiness } from '../event-record-operation-filter.business';
import { EventRecordWindowDetailsBusiness } from './business/event-record-window-details/event-record-window-details.business';
import { EventRecordWindowRecordBusiness } from './business/event-record-window-record.business';
import { EventRecordWindowBusiness } from './event-record-window.business';

@Component({
  selector: 'howell-event-record-window',
  templateUrl: './event-record-window.component.html',
  styleUrls: ['./event-record-window.component.less'],
  providers: [
    EventRecordWindowBusiness,
    EventRecordOperationFilterBusiness,
    EventRecordWindowRecordBusiness,
    EventRecordWindowDetailsBusiness,
  ],
})
export class EventRecordWindowComponent
  extends WindowComponent
  implements OnInit, OnDestroy, OnChanges {
  @Input()
  type = EventType.IllegalDrop;
  @Input()
  index = EventRecordWindowIndex.record;
  @Input()
  stationId?: string;
  @Output()
  image: EventEmitter<ImageControlModelArray> = new EventEmitter();




  constructor(
    public record: EventRecordWindowRecordBusiness,
    public details: EventRecordWindowDetailsBusiness,
    private business: EventRecordWindowBusiness
  ) {
    super();
  }

  filter: EventRecordFilter = new EventRecordFilter()

  Index = EventRecordWindowIndex;

  async ngOnChanges(changes: SimpleChanges) {
    if (changes.stationId) {
      this.filter.station = this.stationId ? new SelectItem(this.stationId) : undefined;
      this.details
    }
  }

  load: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void { }

  ngOnDestroy(): void {

  }

  indexChange(index: number) {
    this.index = index;
    this.stationId = undefined;
  }



  onimage(model: ImageControlModelArray) {
    this.image.emit(model);
  }
}

export enum EventRecordWindowIndex {
  /** 事件 */
  record = 0,
  /** 总图表 */
  count = 1,
  /** 细分图表 */
  details = 2,
  /** 数据比较 */
  comparison = 3,
}

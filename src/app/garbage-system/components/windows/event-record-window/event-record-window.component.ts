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
import { EventRecordViewModel } from 'src/app/common/components/tables/event-record-table/event-record.model';
import { WindowComponent } from 'src/app/common/components/window-control/window.component';
import { EventType } from 'src/app/enum/event-type.enum';
import { EventRecordOperationFilterBusiness } from '../event-record-operation-filter.business';
import { EventRecordWindowDetailsBusiness } from './business/event-record-window-details/event-record-window-details.business';
import { EventRecordWindowRecordBusiness } from './business/event-record-window-record.business';

@Component({
  selector: 'howell-event-record-window',
  templateUrl: './event-record-window.component.html',
  styleUrls: ['./event-record-window.component.less'],
  providers: [
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
  index = EventRecordWindowIndex.details;

  Index = EventRecordWindowIndex;

  constructor(
    public record: EventRecordWindowRecordBusiness,
    public details: EventRecordWindowDetailsBusiness
  ) {
    super();
  }
  ngOnChanges(changes: SimpleChanges): void {
  }

  load: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.index = 0;
  }

  indexChange(index: number) {
    this.index = index;
  }

  @Output()
  image: EventEmitter<ImageControlModelArray> = new EventEmitter();
  onimage(model: ImageControlModelArray) {
    this.image.emit(model);
  }
}

export enum EventRecordWindowIndex {
  /** 事件 */
  record = 0,
  /** 总图表 */
  general = 1,
  /** 细分图表 */
  details = 2,
  /** 数据比较 */
  comparison = 3,
}

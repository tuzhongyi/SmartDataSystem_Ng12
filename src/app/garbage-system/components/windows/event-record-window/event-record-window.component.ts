import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { WindowComponent } from 'src/app/common/components/window-control/window.component';
import { EventType } from 'src/app/enum/event-type.enum';
import { EventRecordOperationFilterBusiness } from '../event-record-operation-filter.business';
import { EventRecordWindowRecordBusiness } from './business/event-record-window-record.business';

@Component({
  selector: 'howell-event-record-window',
  templateUrl: './event-record-window.component.html',
  styleUrls: ['./event-record-window.component.less'],
  providers: [
    EventRecordOperationFilterBusiness,
    EventRecordWindowRecordBusiness,
  ],
})
export class EventRecordWindowComponent
  extends WindowComponent
  implements OnInit, OnDestroy
{
  @Input()
  type = EventType.GarbageFull;

  @Input()
  index = EventRecordWindowIndex.record;

  Index = EventRecordWindowIndex;

  constructor(public record: EventRecordWindowRecordBusiness) {
    super();
  }

  load: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.index = 0;
  }

  indexChange(index: number) {
    this.index = index;
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

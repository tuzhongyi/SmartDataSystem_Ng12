import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IEventRecord } from 'src/app/network/model/garbage-station/event-record/garbage-event-record.model';
import { EventHandleCompleteBusiness } from './event-handle-complete.business';
import {
  EventHandleCompleteImageArgs,
  EventHandleCompleteModel,
  EventHandleCompleteModelType,
  EventRecordCompleteModel,
} from './event-handle-complete.model';
import { EventHandleCompleteProvider } from './event-handle-complete.provider';

@Component({
  selector: 'event-handle-complete',
  templateUrl: './event-handle-complete.component.html',
  styleUrls: ['./event-handle-complete.component.less'],
  providers: [...EventHandleCompleteProvider],
})
export class EventHandleCompleteComponent implements OnInit, OnChanges {
  @Output() image: EventEmitter<EventHandleCompleteImageArgs> =
    new EventEmitter();

  @Input() data?: IEventRecord;
  @Input() index?: number;
  @Input() first?: boolean;
  @Input() last?: boolean;
  @Output() next: EventEmitter<number> = new EventEmitter();
  @Output() prev: EventEmitter<number> = new EventEmitter();
  // @Input() load?: EventEmitter<IEventRecord>;

  constructor(private business: EventHandleCompleteBusiness) {}

  model?: EventRecordCompleteModel;

  CompleteType = EventHandleCompleteModelType;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && this.data) {
      this.loadData(this.data);
    }
  }

  ngOnInit(): void {
    // if (this.load) {
    //   this.load.subscribe((x) => {});
    // }
    // if (this.data) {
    //   this.loadData(this.data);
    // }
  }

  loadData(data: IEventRecord) {
    this.business.load(data).then((x) => {
      this.model = x;
    });
  }

  onimage(item: EventHandleCompleteModel, index: number) {
    this.image.emit({
      model: item,
      index: index,
    });
  }
  onnext() {
    this.next.emit(this.index);
  }
  onprev() {
    this.prev.emit(this.index);
  }
}

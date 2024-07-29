import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { WindowComponent } from 'src/app/common/components/window-control/window.component';
import { EventType } from 'src/app/enum/event-type.enum';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { ListType } from '../event-record-operation/event-record-operation.component';
import { EventRecordWindowIndex } from './event-record-window.model';

@Component({
  selector: 'howell-event-record-window',
  templateUrl: './event-record-window.component.html',
  styleUrls: ['./event-record-window.component.less'],
})
export class EventRecordWindowComponent
  extends WindowComponent
  implements OnInit, OnDestroy
{
  @Input() type = EventType.IllegalDrop;
  @Input() index = EventRecordWindowIndex.record;
  @Input() stationId?: string;
  @Input() divisionId?: string;

  @Input() listType = ListType.table;
  @Input() get?: EventEmitter<Page>;
  @Output() got: EventEmitter<PagedList<EventRecordViewModel>> =
    new EventEmitter();
  @Output() card: EventEmitter<EventRecordViewModel> = new EventEmitter();
  @Output() video: EventEmitter<EventRecordViewModel> = new EventEmitter();
  @Output() image: EventEmitter<PagedArgs<EventRecordViewModel>> =
    new EventEmitter();
  @Output() allvideo: EventEmitter<EventRecordViewModel> = new EventEmitter();
  constructor() {
    super();
  }
  Index = EventRecordWindowIndex;
  ListType = ListType;
  EventType = EventType;

  load: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  indexChange(index: number) {
    this.index = index;
    this.stationId = undefined;
  }

  onimage(model: PagedArgs<EventRecordViewModel>) {
    this.image.emit(model);
  }
  onvideo(model: EventRecordViewModel) {
    this.video.emit(model);
  }
  onallvideo(model: EventRecordViewModel) {
    this.allvideo.emit(model);
  }

  ongot(data: any) {
    this.got.emit(data);
  }
  oncard(args: EventRecordViewModel) {
    this.card.emit(args);
  }
}

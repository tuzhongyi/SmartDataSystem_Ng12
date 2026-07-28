import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { EventType } from 'src/app/enum/event-type.enum';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { EventRecordOperationFilter } from '../../../event-record-operation-filter.business';
import { ListType } from '../../../event-record-operation/event-record-operation.component';

@Component({
  selector: 'event-record-window-list',
  templateUrl: './event-record-window-list.component.html',
  styleUrls: ['./event-record-window-list.component.less'],
  providers: [EventRecordOperationFilter]
})
export class EventRecordWindowListComponent implements OnInit {
  @Input() stationId?: string;
  @Input() divisionId?: string;
  @Input() type = EventType.IllegalDrop;
  @Input() listType = ListType.table;
  @Output() video: EventEmitter<EventRecordViewModel> = new EventEmitter();
  @Output() allvideo: EventEmitter<EventRecordViewModel> = new EventEmitter();
  @Output() image: EventEmitter<PagedArgs<EventRecordViewModel>> =
    new EventEmitter();
  @Input() get?: EventEmitter<Page>;
  @Output() got: EventEmitter<PagedList<EventRecordViewModel>> =
    new EventEmitter();
  @Output() card: EventEmitter<EventRecordViewModel> = new EventEmitter();
  @Output() complete: EventEmitter<PagedArgs<EventRecordViewModel>> =
    new EventEmitter();

  constructor() {}
  filter = new EventRecordOperationFilter();
  EventType = EventType;
  ListType = ListType;

  ngOnInit(): void {
    if (this.stationId) {
      this.filter.stationId = this.stationId;
    }
    if (this.divisionId) {
      this.filter.divisionId = this.divisionId;
    }
    this.filter.type = this.type;
  }

  on = {
    image: (model: PagedArgs<EventRecordViewModel>) => {
      this.image.emit(model);
    },
    got: (data: any) => {
      this.got.emit(data);
    },
    card: (args: EventRecordViewModel) => {
      this.card.emit(args);
    },
    type: (type: ListType) => {
      this.listType = type;
    },
    complete: (model: PagedArgs<EventRecordViewModel>) => {
      this.complete.emit(model);
    },
    video: {
      play: (model: EventRecordViewModel) => {
        this.video.emit(model);
      },
      all: (model: EventRecordViewModel) => {
        this.allvideo.emit(model);
      }
    }
  };
}

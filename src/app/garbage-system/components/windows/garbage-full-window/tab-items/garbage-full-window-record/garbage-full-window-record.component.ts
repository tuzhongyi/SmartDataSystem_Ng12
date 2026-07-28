import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventType } from 'src/app/enum/event-type.enum';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { EventRecordOperationFilter } from '../../../event-record-operation-filter.business';
import { ListType } from '../../../event-record-operation/event-record-operation.component';

@Component({
  selector: 'garbage-full-window-record',
  templateUrl: './garbage-full-window-record.component.html',
  styleUrls: ['./garbage-full-window-record.component.less'],
  providers: [EventRecordOperationFilter]
})
export class GarbageFullWindowRecordComponent implements OnInit {
  @Input() stationId?: string;
  @Input() divisionId?: string;
  @Output() image: EventEmitter<PagedArgs<EventRecordViewModel>> =
    new EventEmitter();
  @Output() video: EventEmitter<EventRecordViewModel> = new EventEmitter();
  @Output() allvideo: EventEmitter<EventRecordViewModel> = new EventEmitter();

  @Input() get?: EventEmitter<Page>;
  @Output() got: EventEmitter<PagedList<EventRecordViewModel>> =
    new EventEmitter();
  @Output() complete = new EventEmitter<PagedArgs<EventRecordViewModel>>();

  constructor() {}
  filter = new EventRecordOperationFilter();
  type = EventType.GarbageFull;
  listType = ListType.table;
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
    image: (item: PagedArgs<EventRecordViewModel>) => {
      this.image.emit(item);
    },

    type: (type: ListType) => {
      this.listType = type;
    },
    got: (data: any) => {
      this.got.emit(data);
    },
    complete: (item: PagedArgs<EventRecordViewModel>) => {
      this.complete.emit(item);
    },
    video: {
      play: (item: EventRecordViewModel) => {
        this.video.emit(item);
      },
      all: (model: EventRecordViewModel) => {
        this.allvideo.emit(model);
      }
    }
  };
}

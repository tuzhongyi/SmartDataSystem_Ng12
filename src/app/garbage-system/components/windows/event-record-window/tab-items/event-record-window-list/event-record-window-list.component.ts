import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { EventType } from 'src/app/enum/event-type.enum';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { EventRecordOperationFilterBusiness } from '../../../event-record-operation-filter.business';
import { ListType } from '../../../event-record-operation/event-record-operation.component';

@Component({
  selector: 'event-record-window-list',
  templateUrl: './event-record-window-list.component.html',
  styleUrls: ['./event-record-window-list.component.less'],
  providers: [EventRecordOperationFilterBusiness],
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
  constructor(
    public filter: EventRecordOperationFilterBusiness,
    private global: GlobalStorageService
  ) {}

  EventType = EventType;
  ListType = ListType;

  ngOnInit(): void {
    if (this.stationId) {
      this.filter.filter.stationId = this.stationId;
    }
    if (this.divisionId) {
      this.filter.filter.divisionId = this.divisionId;
    }
    if (!this.filter.filter.divisionId) {
      this.global.division.promise.selected.then((x) => {
        this.filter.filter.divisionId = x.Id;
      });
    }
  }

  onimage(model: PagedArgs<EventRecordViewModel>) {
    this.image.emit(model);
  }
  onvideo(model: EventRecordViewModel) {
    this.video.emit(model);
  }
  ongot(data: any) {
    this.got.emit(data);
  }
  oncard(args: EventRecordViewModel) {
    this.card.emit(args);
  }
  onallvideo(model: EventRecordViewModel) {
    this.allvideo.emit(model);
  }
  onTypeChange(type: ListType) {
    this.listType = type;
  }
}

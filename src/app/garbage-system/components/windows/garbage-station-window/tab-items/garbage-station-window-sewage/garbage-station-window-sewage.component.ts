import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventRecordFilter } from 'src/app/common/components/tables/event-record/event-record.model';
import { EventType } from 'src/app/enum/event-type.enum';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { SearchOptions } from 'src/app/view-model/search-options.model';
import { ListType } from '../../../event-record-operation/event-record-operation.component';

@Component({
  selector: 'garbage-station-window-sewage',
  templateUrl: './garbage-station-window-sewage.component.html',
  styleUrls: ['./garbage-station-window-sewage.component.less'],
})
export class GarbageStationWindowSewageComponent implements OnInit {
  @Input() get?: EventEmitter<Page>;
  @Output() got: EventEmitter<PagedList<EventRecordViewModel>> =
    new EventEmitter();
  @Output() video: EventEmitter<EventRecordViewModel> = new EventEmitter();
  @Output() image: EventEmitter<PagedArgs<EventRecordViewModel>> =
    new EventEmitter();
  constructor() {}
  filter: EventRecordFilter = new EventRecordFilter();
  isfilter = false;
  type = ListType.table;
  ListType = ListType;
  EventType = EventType;
  load: EventEmitter<EventRecordFilter> = new EventEmitter();
  ngOnInit(): void {
    this.filter.type = EventType.Sewage;
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
  onsearch(opts: SearchOptions) {
    this.filter.opts = opts;
    this.load.emit(this.filter);
  }
  onfilter() {
    this.isfilter = !this.isfilter;
  }
}

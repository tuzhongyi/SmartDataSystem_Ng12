import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { EventType } from 'src/app/enum/event-type.enum';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { EventRecordOperationFilterBusiness } from '../../../event-record-operation-filter.business';
import { ListType } from '../../../event-record-operation/event-record-operation.component';

@Component({
  selector: 'garbage-full-window-record',
  templateUrl: './garbage-full-window-record.component.html',
  styleUrls: ['./garbage-full-window-record.component.less'],
  providers: [EventRecordOperationFilterBusiness],
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

  constructor(
    public filter: EventRecordOperationFilterBusiness,
    private global: GlobalStorageService
  ) {}

  type = EventType.GarbageFull;
  listType = ListType.table;
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

  onimage(item: PagedArgs<EventRecordViewModel>) {
    this.image.emit(item);
  }
  onvideo(item: EventRecordViewModel) {
    this.video.emit(item);
  }
  onTypeChange(type: ListType) {
    this.listType = type;
  }
  onallvideo(model: EventRecordViewModel) {
    this.allvideo.emit(model);
  }
  ongot(data: any) {
    this.got.emit(data);
  }
}

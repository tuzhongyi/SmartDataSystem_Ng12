import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GarbageFullStationTableModel } from 'src/app/common/components/tables/garbage-full-station-table/garbage-full-station-table.model';
import { WindowComponent } from 'src/app/common/components/window-control/window.component';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { GarbageFullStationWindowIndex } from './garbage-full-window.model';

@Component({
  selector: 'howell-garbage-full-window',
  templateUrl: './garbage-full-window.component.html',
  styleUrls: ['./garbage-full-window.component.less'],
})
export class GarbageFullWindowComponent
  extends WindowComponent
  implements OnInit
{
  @Input() index = GarbageFullStationWindowIndex.record;
  @Input() stationId?: string;
  @Input() divisionId?: string;
  @Output() image: EventEmitter<
    PagedArgs<GarbageFullStationTableModel | EventRecordViewModel>
  > = new EventEmitter();
  @Output() video: EventEmitter<EventRecordViewModel> = new EventEmitter();
  @Output() allvideo: EventEmitter<EventRecordViewModel> = new EventEmitter();

  @Input() get?: EventEmitter<Page>;
  @Output() got: EventEmitter<PagedList<EventRecordViewModel>> =
    new EventEmitter();
  @Output() complete = new EventEmitter<PagedArgs<EventRecordViewModel>>();

  constructor() {
    super();
  }

  Index = GarbageFullStationWindowIndex;

  ngOnInit(): void {}

  indexChange(index: number) {
    this.index = index;
  }

  showfilter() {}

  onimage(
    item: PagedArgs<GarbageFullStationTableModel | EventRecordViewModel>
  ) {
    this.image.emit(item);
  }
  onvideo(item: EventRecordViewModel) {
    this.video.emit(item);
  }
  onallvideo(model: EventRecordViewModel) {
    this.allvideo.emit(model);
  }
  ongot(data: any) {
    this.got.emit(data);
  }
  oncomplete(model: PagedArgs<EventRecordViewModel>) {
    this.complete.emit(model);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GarbageDropRecordFilter } from 'src/app/common/components/tables/garbage-drop-record-table/garbage-drop-record.model';
import { EventType } from 'src/app/enum/event-type.enum';
import { GarbageTaskStatus } from 'src/app/enum/garbage-task-status.enum';
import { ImageControlModelArray } from 'src/app/view-model/image-control.model';
import { SearchOptions } from 'src/app/view-model/search-options.model';

@Component({
  selector: 'howell-garbage-station-window-record',
  templateUrl: './garbage-station-window-record.component.html',
  styleUrls: ['./garbage-station-window-record.component.less'],
})
export class GarbageStationWindowRecordComponent implements OnInit {
  @Input()
  isfilter = false;
  @Output()
  image: EventEmitter<ImageControlModelArray> = new EventEmitter();
  @Output()
  changed: EventEmitter<GarbageDropRecordFilter> = new EventEmitter();
  @Input()
  search: EventEmitter<SearchOptions> = new EventEmitter();
  @Input()
  status?: GarbageTaskStatus;
  constructor() {}

  filter = new GarbageDropRecordFilter();

  ngOnInit(): void {
    console.log('sdf', this.status);

    // switch (this.status) {
    //   case GarbageTaskStatus.timeout:
    // }
  }

  onimage(item: ImageControlModelArray) {
    this.image.emit(item);
  }
  onfilterchanged(item: GarbageDropRecordFilter) {
    this.filter = item;
    this.changed.emit(item);
  }
}

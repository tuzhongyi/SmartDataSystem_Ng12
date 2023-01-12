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
    this.filter.IsTimeout = undefined;
    this.filter.IsHandle = undefined;
    switch (this.status) {
      case GarbageTaskStatus.handled:
        this.filter.IsHandle = true;
        break;

      case GarbageTaskStatus.unhandled:
        this.filter.IsHandle = false;
        break;
      case GarbageTaskStatus.timeout:
        this.filter.IsTimeout = true;
        this.filter.IsHandle = false;
        break;
      case GarbageTaskStatus.timeout_handled:
        this.filter.IsTimeout = true;
        this.filter.IsHandle = true;
        break;

      default:
        break;
    }
  }

  onimage(item: ImageControlModelArray) {
    this.image.emit(item);
  }
  onfilterchanged(item: GarbageDropRecordFilter) {
    this.filter = item;
    this.changed.emit(item);
  }
}

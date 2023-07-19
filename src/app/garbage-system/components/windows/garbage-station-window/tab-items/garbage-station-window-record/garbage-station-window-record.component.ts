import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  GarbageDropRecordFilter,
  GarbageDropRecordViewModel,
} from 'src/app/common/components/tables/garbage-drop-record-table/garbage-drop-record.model';
import { GarbageTaskStatus } from 'src/app/enum/garbage-task-status.enum';
import { ImageControlModelArray } from 'src/app/view-model/image-control.model';
import { SearchOptions } from 'src/app/view-model/search-options.model';

@Component({
  selector: 'howell-garbage-station-window-record',
  templateUrl: './garbage-station-window-record.component.html',
  styleUrls: ['./garbage-station-window-record.component.less'],
})
export class GarbageStationWindowRecordComponent implements OnInit, OnChanges {
  @Input() isfilter = false;

  @Input() search: EventEmitter<GarbageDropRecordFilter> = new EventEmitter();
  @Input() status?: GarbageTaskStatus;

  @Input() filter = new GarbageDropRecordFilter();
  @Output() filterChange: EventEmitter<GarbageDropRecordFilter> =
    new EventEmitter();

  @Output() image: EventEmitter<ImageControlModelArray> = new EventEmitter();
  @Output() video: EventEmitter<GarbageDropRecordViewModel> =
    new EventEmitter();

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.search) {
      if (this.search) {
        this.search.subscribe((x) => {
          this.filter = x;
          this.filterChange.emit(this.filter);
        });
      }
    }
  }

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
  onvideo(item: GarbageDropRecordViewModel) {
    this.video.emit(item);
  }
  onsearch(opts: SearchOptions) {
    this.filter.opts = opts;
    this.filterChange.emit(this.filter);
  }
}

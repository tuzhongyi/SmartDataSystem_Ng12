import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  GarbageDropRecordFilter,
  GarbageDropRecordViewModel,
} from 'src/app/common/components/tables/garbage-drop-record-table/garbage-drop-record.model';
import { GarbageDropRecordTaskTableComponent } from 'src/app/common/components/tables/garbage-drop-record-task-table/garbage-drop-record-task-table.component';
import { GarbageTaskStatus } from 'src/app/enum/garbage-task-status.enum';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { SearchOptions } from 'src/app/view-model/search-options.model';
import { ListType } from '../../garbage-station-window-record-operation/garbage-station-window-record-operation.component';

@Component({
  selector: 'howell-garbage-station-window-record',
  templateUrl: './garbage-station-window-record.component.html',
  styleUrls: ['./garbage-station-window-record.component.less'],
})
export class GarbageStationWindowRecordComponent implements OnInit, OnChanges {
  @Input() search: EventEmitter<GarbageDropRecordFilter> = new EventEmitter();
  @Input() isfilter = false;
  @Input() status?: GarbageTaskStatus;
  @Input() table: ListType = ListType.table;
  @Input() filter: GarbageDropRecordFilter = new GarbageDropRecordFilter();
  @Output() filterChange: EventEmitter<GarbageDropRecordFilter> =
    new EventEmitter();

  @Output() image: EventEmitter<PagedArgs<GarbageDropRecordViewModel>> =
    new EventEmitter();
  @Output() video: EventEmitter<GarbageDropRecordViewModel> =
    new EventEmitter();

  constructor() {}

  TableType = ListType;
  load: EventEmitter<GarbageDropRecordFilter> = new EventEmitter();
  @ViewChild('task') task?: GarbageDropRecordTaskTableComponent;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.search) {
      if (this.search) {
        this.search.subscribe((x) => {
          this.filter = x;
          this.filterChange.emit(this.filter);
          this.load.emit(this.filter);
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
        break;
      case GarbageTaskStatus.timeout_handled:
        this.filter.IsTimeout = true;
        this.filter.IsHandle = true;
        break;

      default:
        break;
    }
  }
  typeChange(type: ListType) {
    this.table = type;
  }
  onimage(item: PagedArgs<GarbageDropRecordViewModel>) {
    this.image.emit(item);
  }
  onvideo(item: GarbageDropRecordViewModel) {
    this.video.emit(item);
  }
  onsearch(opts: SearchOptions) {
    this.filter.opts = opts;
    this.filterChange.emit(this.filter);
    this.load.emit(this.filter);
  }
}

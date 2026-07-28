import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {
  GarbageDropRecordFilter,
  GarbageDropRecordViewModel
} from 'src/app/common/components/tables/garbage-drop-record-table/garbage-drop-record.model';
import { GarbageDropRecordTaskTableComponent } from 'src/app/common/components/tables/garbage-drop-record-task-table/garbage-drop-record-task-table.component';
import { GarbageTaskStatus } from 'src/app/enum/garbage-task-status.enum';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import {
  ISearchOptions,
  SearchOption,
  SearchOptionKey
} from 'src/app/view-model/search-options.model';

@Component({
  selector: 'howell-garbage-station-window-record',
  templateUrl: './garbage-station-window-record.component.html',
  styleUrls: ['./garbage-station-window-record.component.less']
})
export class GarbageStationWindowRecordComponent implements OnInit {
  @Input() status?: GarbageTaskStatus;
  @Input() divisionId?: string;

  @Input() filter: GarbageDropRecordFilter = new GarbageDropRecordFilter();
  @Output() image: EventEmitter<PagedArgs<GarbageDropRecordViewModel>> =
    new EventEmitter();
  @Output() video: EventEmitter<GarbageDropRecordViewModel> =
    new EventEmitter();

  @Input() get?: EventEmitter<Page>;
  @Output() got: EventEmitter<PagedList<GarbageDropRecordViewModel>> =
    new EventEmitter();
  @Output() complete = new EventEmitter<
    PagedArgs<GarbageDropRecordViewModel>
  >();
  @Output() allvideo: EventEmitter<GarbageDropRecordViewModel> =
    new EventEmitter();

  constructor() {}
  isfilter = false;
  option = new SearchOption();
  load: EventEmitter<GarbageDropRecordFilter> = new EventEmitter();
  @ViewChild('task') task?: GarbageDropRecordTaskTableComponent;

  ngOnInit(): void {
    if (this.divisionId) {
      this.filter.divisionId = this.divisionId;
    }
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
      case GarbageTaskStatus.timeout_unhandled:
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

  on = {
    find: (data: GarbageDropRecordViewModel) => {
      this.option.text = data.Data.StationName;
      this.option.key = SearchOptionKey.name;
      this.on.search(this.option);
    },
    image: (item: PagedArgs<GarbageDropRecordViewModel>) => {
      this.image.emit(item);
    },

    search: (opts: ISearchOptions) => {
      this.filter.opts = opts;
      this.load.emit(this.filter);
    },
    got: (args: PagedList<GarbageDropRecordViewModel>) => {
      this.got.emit(args);
    },
    complete: (item: PagedArgs<GarbageDropRecordViewModel>) => {
      this.complete.emit(item);
    },
    video: {
      play: (item: GarbageDropRecordViewModel) => {
        this.video.emit(item);
      },
      all: (model: GarbageDropRecordViewModel) => {
        this.allvideo.emit(model);
      }
    }
  };
}

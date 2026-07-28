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
import { DateTimeTool } from 'src/app/common/tools/date-time-tool/datetime.tool';
import { GarbageTaskStatus } from 'src/app/enum/garbage-task-status.enum';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import {
  ISearchOptions,
  SearchOption,
  SearchOptionKey
} from 'src/app/view-model/search-options.model';

@Component({
  selector: 'garbage-drop-window-item-record',
  templateUrl: './garbage-drop-window-item-record.component.html',
  styleUrls: ['./garbage-drop-window-item-record.component.less']
})
export class GarbageDropStationWindowItemRecordComponent implements OnInit {
  @Input() status?: GarbageTaskStatus;
  @Input() divisionId?: string;
  @Input() stationId?: string;

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
  duration?: number = 0;
  filter: GarbageDropRecordFilter = new GarbageDropRecordFilter();
  option = new SearchOption();

  load: EventEmitter<GarbageDropRecordFilter> = new EventEmitter();
  @ViewChild('task') task?: GarbageDropRecordTaskTableComponent;

  ngOnInit(): void {
    if (this.divisionId) {
      this.filter.divisionId = this.divisionId;
    }
    if (this.stationId) {
      this.filter.stationId = this.stationId;
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
    option: {
      search: (opts: ISearchOptions) => {
        this.filter.opts = opts;
        this.load.emit(this.filter);
      },
      duration: (day?: number) => {
        switch (day) {
          case 0:
            this.filter.duration = DateTimeTool.allDay(new Date());
            break;
          case undefined:
            break;
          default:
            this.filter.duration = DateTimeTool.beforeDay(new Date(), day);
            break;
        }
      }
    },
    filter: {
      duration: () => {
        this.duration = undefined;
      }
    },
    find: (data: GarbageDropRecordViewModel) => {
      this.option.text = data.Data.StationName;
      this.option.key = SearchOptionKey.name;
      this.on.option.search(this.option);
    },
    image: (item: PagedArgs<GarbageDropRecordViewModel>) => {
      this.image.emit(item);
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

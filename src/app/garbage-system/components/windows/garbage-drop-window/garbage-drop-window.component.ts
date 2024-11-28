import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { LineZoomChartArgs } from 'src/app/common/components/charts/line-zoom-chart/line-zoom-chart.model';
import { GarbageDropRecordViewModel } from 'src/app/common/components/tables/garbage-drop-record-table/garbage-drop-record.model';
import { GarbageDropStationTableModel } from 'src/app/common/components/tables/garbage-drop-station-table/garbage-drop-station-table.model';
import { WindowComponent } from 'src/app/common/components/window-control/window.component';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { GarbageTaskStatus } from 'src/app/enum/garbage-task-status.enum';
import { UserUIType } from 'src/app/enum/user-ui-type.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { ImageControlModel } from 'src/app/view-model/image-control.model';
import {
  EventRecordWindowDetailsBusiness,
  EventRecordWindowDetailsProviders,
} from '../event-record-window/tab-items/event-record-window-details/business/event-record-window-details.business';
import {
  GarbageDropStationWindowArgs,
  GarbageDropStationWindowIndex,
} from './garbage-drop-window.model';

@Component({
  selector: 'howell-garbage-drop-window',
  templateUrl: './garbage-drop-window.component.html',
  styleUrls: ['./garbage-drop-window.component.less'],
  providers: [...EventRecordWindowDetailsProviders],
})
export class GarbageDropStationWindowComponent
  extends WindowComponent
  implements OnInit, OnChanges
{
  @Input() taskStatus?: GarbageTaskStatus;
  @Input() index = GarbageDropStationWindowIndex.record;
  @Output() image: EventEmitter<
    PagedArgs<
      | GarbageDropStationTableModel
      | GarbageDropRecordViewModel
      | ImageControlModel
    >
  > = new EventEmitter();
  @Output() position: EventEmitter<GarbageStation> = new EventEmitter();
  @Input() args: GarbageDropStationWindowArgs = {};

  @Output() video: EventEmitter<GarbageDropRecordViewModel> =
    new EventEmitter();
  @Input() get?: EventEmitter<Page>;
  @Output() got: EventEmitter<PagedList<GarbageDropRecordViewModel>> =
    new EventEmitter();
  @Output() chartdblclick: EventEmitter<LineZoomChartArgs> = new EventEmitter();
  @Output() complete = new EventEmitter<
    PagedArgs<GarbageDropRecordViewModel>
  >();

  constructor(
    public details: EventRecordWindowDetailsBusiness,
    local: LocalStorageService,
    private global: GlobalStorageService
  ) {
    super();
    this.ui = local.user.UIType;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.args) {
      this.stationArgs.divisionId = this.args.divisionId;
      this.stationArgs.stationId = this.args.stationId;
      this.stationId = this.args.stationId;
      this.divisionId = this.args.divisionId;
    }
  }

  ui?: UserUIType;
  UserUIType = UserUIType;

  Index = GarbageDropStationWindowIndex;
  divisionId?: string;
  stationId?: string;
  stationArgs: GarbageDropStationWindowArgs = {};

  ngOnInit(): void {
    this.global.division.selected.then((x) => {
      this.divisionId = x.Id;
    });
  }

  onimage(
    item: PagedArgs<
      | GarbageDropStationTableModel
      | GarbageDropRecordViewModel
      | ImageControlModel
    >
  ) {
    this.image.emit(item);
  }

  indexChange(index: number) {
    this.index = index;
  }

  onposition(station: GarbageStation) {
    this.position.emit(station);
  }

  ongot(args: PagedList<GarbageDropRecordViewModel>) {
    this.got.emit(args);
  }
  onvideo(item: GarbageDropRecordViewModel) {
    this.video.emit(item);
  }
  onstaydblclick(item: LineZoomChartArgs) {
    this.chartdblclick.emit(item);
  }
  oncomplete(item: PagedArgs<GarbageDropRecordViewModel>) {
    this.complete.emit(item);
  }
}

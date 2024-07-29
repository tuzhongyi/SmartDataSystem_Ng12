import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LineZoomChartArgs } from 'src/app/common/components/charts/line-zoom-chart/line-zoom-chart.model';
import { GarbageDropRecordViewModel } from 'src/app/common/components/tables/garbage-drop-record-table/garbage-drop-record.model';
import {
  GarbageDropStationTableArgs,
  GarbageDropStationTableModel,
} from 'src/app/common/components/tables/garbage-drop-station-table/garbage-drop-station-table.model';
import { WindowComponent } from 'src/app/common/components/window-control/window.component';
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
import { GarbageDropStationWindowIndex } from './garbage-drop-window.model';

@Component({
  selector: 'howell-garbage-drop-window',
  templateUrl: './garbage-drop-window.component.html',
  styleUrls: ['./garbage-drop-window.component.less'],
  providers: [...EventRecordWindowDetailsProviders],
})
export class GarbageDropStationWindowComponent
  extends WindowComponent
  implements OnInit
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
  @Input() args: GarbageDropStationTableArgs = {};

  @Output() video: EventEmitter<GarbageDropRecordViewModel> =
    new EventEmitter();
  @Input() get?: EventEmitter<Page>;
  @Output() got: EventEmitter<PagedList<GarbageDropRecordViewModel>> =
    new EventEmitter();
  @Output() chartdblclick: EventEmitter<LineZoomChartArgs> = new EventEmitter();

  constructor(
    public details: EventRecordWindowDetailsBusiness,
    local: LocalStorageService
  ) {
    super();
    this.ui = local.user.UIType;
  }

  ui?: UserUIType;
  UserUIType = UserUIType;

  Index = GarbageDropStationWindowIndex;

  ngOnInit(): void {}

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
}

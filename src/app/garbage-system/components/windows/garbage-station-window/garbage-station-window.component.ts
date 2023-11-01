import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LineZoomChartArgs } from 'src/app/common/components/charts/line-zoom-chart/line-zoom-chart.model';
import { GarbageDropEventRecordModel } from 'src/app/common/components/tables/daqupiao/dapuqiao-garbage-drop-record-table/dapuqiao-garbage-drop-record-table.model';
import { GarbageDropRecordViewModel } from 'src/app/common/components/tables/garbage-drop-record-table/garbage-drop-record.model';
import { GarbageStationTableModel } from 'src/app/common/components/tables/garbage-station-table/garbage-station-table.model';
import { WindowComponent } from 'src/app/common/components/window-control/window.component';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { GarbageTaskStatus } from 'src/app/enum/garbage-task-status.enum';
import { UserUIType } from 'src/app/enum/user-ui-type.enum';
import { AIGarbageRfidCardRecord } from 'src/app/network/model/ai-garbage/rfid-card-record.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { ImageControlModel } from 'src/app/view-model/image-control.model';

@Component({
  selector: 'howell-garbage-station-window',
  templateUrl: './garbage-station-window.component.html',
  styleUrls: ['./garbage-station-window.component.less'],
})
export class GarbageStationWindowComponent
  extends WindowComponent
  implements OnInit
{
  @Input() dapuqiao_level?: number;

  @Input()
  index = GarbageStationWindowIndex.station;
  @Input()
  stationId?: string;
  @Input()
  divisionId?: string;
  @Input()
  taskStatus?: GarbageTaskStatus;

  @Input() get?: EventEmitter<Page>;
  @Output() got: EventEmitter<PagedList<EventRecordViewModel>> =
    new EventEmitter();
  @Output() image: EventEmitter<
    PagedArgs<
      | GarbageDropRecordViewModel
      | GarbageStationTableModel
      | EventRecordViewModel
      | ImageControlModel
    >
  > = new EventEmitter();
  @Output() chartdblclick: EventEmitter<LineZoomChartArgs> = new EventEmitter();
  @Output() position: EventEmitter<GarbageStation> = new EventEmitter();
  @Output() video: EventEmitter<
    GarbageDropRecordViewModel | AIGarbageRfidCardRecord | EventRecordViewModel
  > = new EventEmitter();

  @Output() dapuqiao_image: EventEmitter<
    PagedArgs<GarbageDropEventRecordModel>
  > = new EventEmitter();
  @Output() dapuqiao_details: EventEmitter<GarbageDropEventRecordModel> =
    new EventEmitter();
  @Output() dapuqiao_picture: EventEmitter<GarbageDropEventRecordModel> =
    new EventEmitter();
  @Output() dapuqiao_process: EventEmitter<GarbageDropEventRecordModel> =
    new EventEmitter();

  constructor(local: LocalStorageService) {
    super();
    this.ui = local.user.UIType;
  }
  ui?: UserUIType;
  UserUIType = UserUIType;
  Index = GarbageStationWindowIndex;
  isfilter = false;

  ngOnInit(): void {}

  indexChange(index: number) {
    this.index = index;
    this.divisionId = undefined;
    this.stationId = undefined;
  }

  onimage(
    item: PagedArgs<
      | GarbageDropRecordViewModel
      | GarbageStationTableModel
      | EventRecordViewModel
      | ImageControlModel
    >
  ) {
    this.image.emit(item);
  }

  onstaydblclick(item: LineZoomChartArgs) {
    this.chartdblclick.emit(item);
  }

  onposition(item: GarbageStation) {
    this.position.emit(item);
  }

  onvideo(
    args:
      | GarbageDropRecordViewModel
      | AIGarbageRfidCardRecord
      | EventRecordViewModel
  ) {
    this.video.emit(args);
  }
  ongot(data: any) {
    this.got.emit(data);
  }

  ondapuqiaodetails(item: GarbageDropEventRecordModel) {
    this.dapuqiao_details.emit(item);
  }
  ondapuqiaopicture(item: GarbageDropEventRecordModel) {
    this.dapuqiao_picture.emit(item);
  }
  ondapuqiaoimage(model: PagedArgs<GarbageDropEventRecordModel>) {
    this.dapuqiao_image.emit(model);
  }
  ondapuqiaoprocess(item: GarbageDropEventRecordModel) {
    this.dapuqiao_process.emit(item);
  }
}

export enum GarbageStationWindowIndex {
  /** 投放点列表 */
  station = 0,
  /** 小包垃圾滞留 */
  stay = 1,
  /** 总图表 */
  general = 2,
  /** 细分图表 */
  details = 3,
  /** 报警事件处置 */
  record = 4,
  card = 5,
  dapuqiao_record = 6,
  sewage = 7,
}

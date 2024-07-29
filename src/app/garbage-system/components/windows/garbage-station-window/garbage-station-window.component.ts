import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Input() index = GarbageStationWindowIndex.station;
  @Input() stationId?: string;
  @Input() divisionId?: string;
  @Input() taskStatus?: GarbageTaskStatus;

  @Input() get?: EventEmitter<Page>;
  @Output() got: EventEmitter<PagedList<EventRecordViewModel>> =
    new EventEmitter();
  @Output() image: EventEmitter<
    PagedArgs<GarbageStationTableModel | EventRecordViewModel>
  > = new EventEmitter();

  @Output() position: EventEmitter<GarbageStation> = new EventEmitter();
  @Output() video: EventEmitter<
    AIGarbageRfidCardRecord | EventRecordViewModel
  > = new EventEmitter();

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

  onimage(item: PagedArgs<GarbageStationTableModel | EventRecordViewModel>) {
    this.image.emit(item);
  }

  onposition(item: GarbageStation) {
    this.position.emit(item);
  }

  onvideo(args: AIGarbageRfidCardRecord | EventRecordViewModel) {
    this.video.emit(args);
  }
  ongot(data: any) {
    this.got.emit(data);
  }
}

export enum GarbageStationWindowIndex {
  /** 投放点列表 */
  station,
  /** 总图表 */
  general,
  /** 细分图表 */
  details,
  card,
  sewage,
}

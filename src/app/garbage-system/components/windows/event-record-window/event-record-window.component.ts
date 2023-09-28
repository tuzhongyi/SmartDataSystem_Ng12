import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { WindowComponent } from 'src/app/common/components/window-control/window.component';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { EventType } from 'src/app/enum/event-type.enum';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { EventRecordOperationFilterBusiness } from '../event-record-operation-filter.business';
import { ListType } from '../event-record-operation/event-record-operation.component';
import { EventRecordWindowDetailsBusiness } from './business/event-record-window-details/event-record-window-details.business';
import { EventRecordWindowRecordBusiness } from './business/event-record-window-record.business';
import { EventRecordWindowBusiness } from './event-record-window.business';

@Component({
  selector: 'howell-event-record-window',
  templateUrl: './event-record-window.component.html',
  styleUrls: ['./event-record-window.component.less'],
  providers: [
    EventRecordWindowBusiness,
    EventRecordOperationFilterBusiness,
    EventRecordWindowRecordBusiness,
    EventRecordWindowDetailsBusiness,
  ],
})
export class EventRecordWindowComponent
  extends WindowComponent
  implements OnInit, OnDestroy, OnChanges
{
  @Input() type = EventType.IllegalDrop;
  @Input() index = EventRecordWindowIndex.record;
  @Input() stationId?: string;
  @Input() divisionId?: string;

  @Input() listType = ListType.table;
  @Input() get?: EventEmitter<Page>;
  @Output() got: EventEmitter<PagedList<EventRecordViewModel>> =
    new EventEmitter();
  @Output() card: EventEmitter<EventRecordViewModel> = new EventEmitter();
  @Output() video: EventEmitter<EventRecordViewModel> = new EventEmitter();
  @Output() image: EventEmitter<PagedArgs<EventRecordViewModel>> =
    new EventEmitter();
  constructor(
    public record: EventRecordWindowRecordBusiness,
    public details: EventRecordWindowDetailsBusiness,
    private globalStorage: GlobalStorageService,
    private business: EventRecordWindowBusiness
  ) {
    super();
  }
  Index = EventRecordWindowIndex;
  ListType = ListType;

  async ngOnChanges(changes: SimpleChanges) {
    if (changes.stationId) {
      this.record.filter.filter.stationId = this.stationId;
    }
    if (changes.divisionId) {
      this.record.filter.filter.divisionId = this.divisionId;
    }
  }

  load: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    if (!this.record.filter.filter.divisionId)
      this.record.filter.filter.divisionId = this.globalStorage.divisionId;
  }

  ngOnDestroy(): void {}

  indexChange(index: number) {
    this.index = index;
    this.stationId = undefined;
  }

  onimage(model: PagedArgs<EventRecordViewModel>) {
    this.image.emit(model);
  }
  onvideo(model: EventRecordViewModel) {
    this.video.emit(model);
  }

  onTypeChange(type: ListType) {
    this.listType = type;
  }

  ongot(data: any) {
    this.got.emit(data);
  }
  oncard(args: EventRecordViewModel) {
    this.card.emit(args);
  }
}

export enum EventRecordWindowIndex {
  /** 事件 */
  record = 0,
  /** 总图表 */
  count = 1,
  /** 细分图表 */
  details = 2,
  /** 数据比较 */
  comparison = 3,
}

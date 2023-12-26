import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GarbageFullStationTableModel } from 'src/app/common/components/tables/garbage-full-station-table/garbage-full-station-table.model';
import { WindowComponent } from 'src/app/common/components/window-control/window.component';
import { EventType } from 'src/app/enum/event-type.enum';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { EventRecordOperationFilterBusiness } from '../event-record-operation-filter.business';
import { ListType } from '../event-record-operation/event-record-operation.component';
import { GarbageFullStationWindowRecordBusiness } from './business/garbage-full-station-window-record.business';
import { GarbageFullStationWindowStationBusiness } from './business/garbage-full-station-window-station.business';

@Component({
  selector: 'howell-garbage-full-station-window',
  templateUrl: './garbage-full-station-window.component.html',
  styleUrls: ['./garbage-full-station-window.component.less'],
  providers: [
    GarbageFullStationWindowStationBusiness,
    EventRecordOperationFilterBusiness,
    GarbageFullStationWindowRecordBusiness,
  ],
})
export class GarbageFullStationWindowComponent
  extends WindowComponent
  implements OnInit
{
  @Output() image: EventEmitter<
    PagedArgs<GarbageFullStationTableModel | EventRecordViewModel>
  > = new EventEmitter();
  @Output() video: EventEmitter<EventRecordViewModel> = new EventEmitter();

  Index = GarbageFullStationWindowIndex;

  type = EventType.GarbageFull;
  listType = ListType.table;
  ListType = ListType;
  constructor(
    public station: GarbageFullStationWindowStationBusiness,
    public record: GarbageFullStationWindowRecordBusiness
  ) {
    super();
  }

  index = GarbageFullStationWindowIndex.station;

  ngOnInit(): void {}

  indexChange(index: number) {
    this.index = index;
  }

  showfilter() {}

  onimage(
    item: PagedArgs<GarbageFullStationTableModel | EventRecordViewModel>
  ) {
    this.image.emit(item);
  }
  onvideo(item: EventRecordViewModel) {
    this.video.emit(item);
  }
  onTypeChange(type: ListType) {
    this.listType = type;
  }
}
export enum GarbageFullStationWindowIndex {
  station = 0,
  record = 1,
}

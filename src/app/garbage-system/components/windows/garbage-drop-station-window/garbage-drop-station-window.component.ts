import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GarbageDropStationTableModel } from 'src/app/common/components/tables/garbage-drop-station-table/garbage-drop-station-table.model';
import { WindowComponent } from 'src/app/common/components/window-control/window.component';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { EventType } from 'src/app/enum/event-type.enum';
import { UserUIType } from 'src/app/enum/user-ui-type.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { SearchOptions } from 'src/app/view-model/search-options.model';
import { EventRecordWindowDetailsBusiness } from '../event-record-window/business/event-record-window-details/event-record-window-details.business';

@Component({
  selector: 'howell-garbage-drop-station-window',
  templateUrl: './garbage-drop-station-window.component.html',
  styleUrls: ['./garbage-drop-station-window.component.less'],
  providers: [EventRecordWindowDetailsBusiness],
})
export class GarbageDropStationWindowComponent
  extends WindowComponent
  implements OnInit
{
  @Input()
  index = GarbageDropStationWindowIndex.list;
  @Output()
  image: EventEmitter<PagedArgs<GarbageDropStationTableModel>> =
    new EventEmitter();
  @Output()
  position: EventEmitter<GarbageStation> = new EventEmitter();
  @Input()
  divisionId?: string;

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
  load: EventEmitter<SearchOptions> = new EventEmitter();

  type: EventType[] = [EventType.GarbageDrop, EventType.GarbageDropTimeout];

  ngOnInit(): void {}

  onsearch(text: SearchOptions) {
    this.load.emit(text);
  }
  onimage(item: PagedArgs<GarbageDropStationTableModel>) {
    this.image.emit(item);
  }

  indexChange(index: number) {
    this.index = index;
  }

  onposition(station: GarbageStation) {
    this.position.emit(station);
  }
}
export enum GarbageDropStationWindowIndex {
  list = 0,
  count = 1,
  details = 3,
  dapuqiao_count = 2,
  dapuqiao_details = 4,
}

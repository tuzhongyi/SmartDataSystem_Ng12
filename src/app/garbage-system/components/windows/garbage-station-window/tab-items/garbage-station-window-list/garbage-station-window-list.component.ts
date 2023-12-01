import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  GarbageStationTableArgs,
  GarbageStationTableModel,
} from 'src/app/common/components/tables/garbage-station-table/garbage-station-table.model';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Language } from 'src/app/common/tools/language';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { StationState } from 'src/app/enum/station-state.enum';
import { StationType } from 'src/app/enum/station-type.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { SearchOptions } from 'src/app/view-model/search-options.model';
import { DivisionTreeSourceSelection } from './garbage-station-window-list.model';

@Component({
  selector: 'garbage-station-window-list',
  templateUrl: './garbage-station-window-list.component.html',
  styleUrls: ['./garbage-station-window-list.component.less'],
})
export class GarbageStationWindowListComponent implements OnInit {
  @Input() stationId?: string;
  @Input() divisionId?: string;
  @Input() load: EventEmitter<SearchOptions> = new EventEmitter();
  @Output() image: EventEmitter<PagedArgs<GarbageStationTableModel>> =
    new EventEmitter();
  @Output() position: EventEmitter<GarbageStation> = new EventEmitter();
  constructor(private global: GlobalStorageService) {}
  args: GarbageStationTableArgs = new GarbageStationTableArgs();
  tableLoad = new EventEmitter<GarbageStationTableArgs>();
  selection = new DivisionTreeSourceSelection();
  StationType = StationType;
  StationState = StationState;
  Language = Language;
  ngOnInit(): void {
    this.args.stationId = this.stationId;
    this.args.divisionId = this.divisionId;
    this.load.subscribe((x) => {
      this.args.opts = x;
      this.tableLoad.emit(this.args);
    });

    this.selection.type = EnumHelper.GetDivisionChildType(
      this.global.defaultDivisionType
    );
    this.selection.default = [this.global.divisionId];

    this.selection.select.subscribe((x) => {
      this.args.divisionId = x?.Id;
    });
  }

  onimage(item: PagedArgs<GarbageStationTableModel>) {
    this.image.emit(item);
  }
  onposition(item: GarbageStation) {
    this.position.emit(item);
  }
  onsearch(opts?: SearchOptions) {
    this.args.opts = opts;
    this.tableLoad.emit(this.args);
  }
}

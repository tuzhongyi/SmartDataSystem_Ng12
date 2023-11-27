import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  GarbageStationTableArgs,
  GarbageStationTableModel,
} from 'src/app/common/components/tables/garbage-station-table/garbage-station-table.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { SearchOptions } from 'src/app/view-model/search-options.model';

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
  constructor() {}
  args: GarbageStationTableArgs = new GarbageStationTableArgs();
  tableLoad = new EventEmitter<GarbageStationTableArgs>();
  ngOnInit(): void {
    this.args.stationId = this.stationId;
    this.args.divisionId = this.divisionId;
    this.load.subscribe((x) => {
      this.args.opts = x;
      this.tableLoad.emit(this.args);
    });
  }

  onimage(item: PagedArgs<GarbageStationTableModel>) {
    this.image.emit(item);
  }
  onposition(item: GarbageStation) {
    this.position.emit(item);
  }
  onsearch(opts: SearchOptions) {
    this.args.opts = opts;
    this.tableLoad.emit(this.args);
  }
}

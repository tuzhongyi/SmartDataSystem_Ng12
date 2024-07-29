import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  GarbageDropStationTableArgs,
  GarbageDropStationTableModel,
} from 'src/app/common/components/tables/garbage-drop-station-table/garbage-drop-station-table.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { SearchOptions } from 'src/app/view-model/search-options.model';

@Component({
  selector: 'garbage-drop-window-item-station',
  templateUrl: './garbage-drop-window-item-station.component.html',
  styleUrls: ['./garbage-drop-window-item-station.component.less'],
})
export class GarbageDropStationWindowItemStationComponent implements OnInit {
  @Input() args: GarbageDropStationTableArgs = {};
  @Output() image: EventEmitter<PagedArgs<GarbageDropStationTableModel>> =
    new EventEmitter();
  @Output() position: EventEmitter<GarbageStation> = new EventEmitter();
  constructor() {}

  load: EventEmitter<GarbageDropStationTableArgs> = new EventEmitter();

  ngOnInit(): void {}

  onimage(item: PagedArgs<GarbageDropStationTableModel>) {
    this.image.emit(item);
  }

  onposition(station: GarbageStation) {
    this.position.emit(station);
  }

  onsearch(text: SearchOptions) {
    this.args.opts = text;
    this.load.emit(this.args);
  }
}

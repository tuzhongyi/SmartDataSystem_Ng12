import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  GarbageFullStationTableArgs,
  GarbageFullStationTableModel
} from 'src/app/common/components/tables/garbage-full-station-table/garbage-full-station-table.model';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { ISearchOptions } from 'src/app/view-model/search-options.model';

@Component({
  selector: 'garbage-full-window-station',
  templateUrl: './garbage-full-window-station.component.html',
  styleUrls: ['./garbage-full-window-station.component.less']
})
export class GarbageFullWindowStationComponent implements OnInit {
  @Output() image: EventEmitter<PagedArgs<GarbageFullStationTableModel>> =
    new EventEmitter();
  constructor() {}

  load: EventEmitter<GarbageFullStationTableArgs> = new EventEmitter();

  ngOnInit(): void {}

  onsearch(text: ISearchOptions) {
    let args = new GarbageFullStationTableArgs();
    switch (text.key) {
      case 'Name':
        args.station = text.text;
        break;
      case 'CommunityName':
        args.community = text.text;
        break;
      default:
        break;
    }
    this.load.emit(args);
  }

  onimage(item: PagedArgs<GarbageFullStationTableModel>) {
    this.image.emit(item);
  }
}

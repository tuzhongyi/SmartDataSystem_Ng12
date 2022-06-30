import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GarbageDropRecordFilter } from 'src/app/common/components/tables/garbage-drop-record-table/garbage-drop-record.model';
import { ImageControlModelArray } from 'src/app/view-model/image-control.model';
import { SearchOptions } from 'src/app/view-model/search-options.model';

@Component({
  selector: 'howell-garbage-station-window-record',
  templateUrl: './garbage-station-window-record.component.html',
  styleUrls: ['./garbage-station-window-record.component.less'],
})
export class GarbageStationWindowRecordComponent implements OnInit {
  @Input()
  isfilter = false;
  @Output()
  image: EventEmitter<ImageControlModelArray> = new EventEmitter();
  @Output()
  changed: EventEmitter<GarbageDropRecordFilter> = new EventEmitter();
  @Input()
  search: EventEmitter<SearchOptions> = new EventEmitter();

  constructor() {}

  filter = new GarbageDropRecordFilter();

  ngOnInit(): void {}

  onimage(item: ImageControlModelArray) {
    this.image.emit(item);
  }
  onfilterchanged(item: GarbageDropRecordFilter) {
    this.filter = item;
    this.changed.emit(item);
  }
}

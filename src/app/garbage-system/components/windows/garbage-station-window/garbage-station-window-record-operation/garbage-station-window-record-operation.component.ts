import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Language } from 'src/app/common/tools/language';
import {
  SearchOptionKey,
  SearchOptions,
} from 'src/app/view-model/search-options.model';

@Component({
  selector: 'howell-garbage-station-window-record-operation',
  templateUrl: './garbage-station-window-record-operation.component.html',
  styleUrls: ['./garbage-station-window-record-operation.component.less'],
})
export class GarbageStationWindowRecordOperationComponent implements OnInit {
  @Output() search: EventEmitter<SearchOptions> = new EventEmitter();

  @Input() isfilter: boolean = false;
  @Output() isfilterChange: EventEmitter<boolean> = new EventEmitter();
  constructor() {}

  searchOption: SearchOptions = {
    text: '',
    key: SearchOptionKey.name,
  };
  Language = Language;
  Key = SearchOptionKey;

  ngOnInit(): void {}

  onsearch() {
    this.search.emit(this.searchOption);
  }

  onfilter() {
    this.isfilter = !this.isfilter;
    this.isfilterChange.emit(this.isfilter);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Language } from 'src/app/common/tools/language';
import {
  ISearchOptions,
  SearchOption,
  SearchOptionKey
} from 'src/app/view-model/search-options.model';

@Component({
  selector: 'howell-garbage-station-window-record-operation',
  templateUrl: './garbage-station-window-record-operation.component.html',
  styleUrls: ['./garbage-station-window-record-operation.component.less']
})
export class GarbageStationWindowRecordOperationComponent implements OnInit {
  @Output() search: EventEmitter<ISearchOptions> = new EventEmitter();
  @Input() option: ISearchOptions = new SearchOption();
  @Output() optionChange = new EventEmitter<ISearchOptions>();

  @Input() isfilter: boolean = false;
  @Output() isfilterChange: EventEmitter<boolean> = new EventEmitter();

  @Input() duration?: number = 0;
  @Output() durationChange = new EventEmitter<number | undefined>();
  @Input() durationable = false;
  constructor() {}

  Language = Language;
  Key = SearchOptionKey;

  ngOnInit(): void {}

  on = {
    duration: () => {
      this.durationChange.emit(this.duration);
    },
    search: () => {
      this.search.emit(this.option);
    },
    filter: () => {
      this.isfilter = !this.isfilter;
      this.isfilterChange.emit(this.isfilter);
    },
    change: () => {
      this.optionChange.emit(this.option);
    }
  };
}

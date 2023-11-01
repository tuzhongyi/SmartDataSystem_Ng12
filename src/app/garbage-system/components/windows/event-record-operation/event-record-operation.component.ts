import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { Language } from 'src/app/common/tools/language';
import {
  SearchOptionKey,
  SearchOptions,
} from 'src/app/view-model/search-options.model';

@Component({
  selector: 'howell-event-record-operation',
  templateUrl: './event-record-operation.component.html',
  styleUrls: ['./event-record-operation.component.less'],
})
export class EventRecordOperationComponent implements OnInit {
  @Output() search: EventEmitter<SearchOptions> = new EventEmitter();
  @Output() filter: EventEmitter<void> = new EventEmitter();
  @Input() type: ListType = ListType.table;
  @Output() typeChange: EventEmitter<ListType> = new EventEmitter();

  constructor() {}

  listTypes: SelectItem[] = [];
  searchOpts: SelectItem[] = [];
  searchOption: SearchOptions = {
    text: '',
    propertyName: SearchOptionKey.name,
  };
  ListType = ListType;
  ngOnInit(): void {
    this.initSearchOpts();
  }

  initSearchOpts() {
    this.searchOpts.push(
      SelectItem.create(SearchOptionKey.name, Language.SearchOption)
    );
    this.searchOpts.push(
      SelectItem.create(SearchOptionKey.community, Language.SearchOption)
    );
  }

  onsearch() {
    this.search.emit(this.searchOption);
  }
  onfilter() {
    this.filter.emit();
  }

  onListTypeSelect() {
    this.typeChange.emit(this.type);
  }
  onSearchOptionSelect(item: SelectItem) {
    this.searchOption.propertyName = item.value;
  }
}

export enum ListType {
  table,
  card,
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { Language } from 'src/app/common/tools/language';
import { Enum } from 'src/app/enum/enum-helper';
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
  @Output() typeChange: EventEmitter<ListType> = new EventEmitter();

  constructor() {}

  listTypes: SelectItem[] = [];
  searchOpts: SelectItem[] = [];
  searchOption: SearchOptions = {
    text: '',
    propertyName: SearchOptionKey.name,
  };

  ngOnInit(): void {
    this.initListType();
    this.initSearchOpts();
  }

  initListType() {
    let typeEnum = new Enum(ListType);
    this.listTypes = typeEnum.toArray().map((x) => {
      let item = new SelectItem();
      item.Id = x;

      switch (x) {
        case ListType.table:
          item.Name = '&#xf08b;&nbsp;'; //'<i class="howell-icon-ul"></i>';
          break;
        case ListType.card:
          item.Name = '&#xf225;&nbsp;'; //'<i class="howell-icon-cam-all1"></i>';
          break;

        default:
          break;
      }
      item.value = x;
      return item;
    });
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

  onListTypeSelect(item: SelectItem) {
    this.typeChange.emit(item.value);
  }
  onSearchOptionSelect(item: SelectItem) {
    this.searchOption.propertyName = item.value;
  }
}

export enum ListType {
  table,
  card,
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { Language } from 'src/app/common/tools/language';
import { Enum } from 'src/app/enum/enum-helper';
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

  @Input() table: ListType = ListType.table;
  @Output() tableChange: EventEmitter<ListType> = new EventEmitter();

  @Input() isfilter: boolean = false;
  @Output() isfilterChange: EventEmitter<boolean> = new EventEmitter();
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
          item.Name = '&#xf274;&nbsp;'; //'<i class="howell-icon-cam-all1"></i>';
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

  onListTypeSelect(item: SelectItem) {
    this.tableChange.emit(item.value);
  }
  onSearchOptionSelect(item: SelectItem) {
    this.searchOption.propertyName = item.value;
  }
  onfilter() {
    this.isfilter = !this.isfilter;
    this.isfilterChange.emit(this.isfilter);
  }
}

export enum ListType {
  table,
  card,
}

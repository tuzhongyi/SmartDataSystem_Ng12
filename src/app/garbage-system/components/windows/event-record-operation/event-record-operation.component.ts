import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { Language } from 'src/app/common/tools/language';
import {
  ISearchOptions,
  SearchOption,
  SearchOptionKey
} from 'src/app/view-model/search-options.model';

@Component({
  selector: 'howell-event-record-operation',
  templateUrl: './event-record-operation.component.html',
  styleUrls: ['./event-record-operation.component.less']
})
export class EventRecordOperationComponent implements OnInit {
  @Output() search: EventEmitter<ISearchOptions> = new EventEmitter();
  @Output() filter: EventEmitter<void> = new EventEmitter();
  @Input() type: ListType = ListType.table;
  @Output() typeChange: EventEmitter<ListType> = new EventEmitter();

  @Input() option = new SearchOption();
  @Output() optionChange = new EventEmitter<SearchOption>();

  @Input() duration?: number = 0;
  @Output() durationChange = new EventEmitter<number | undefined>();
  @Input() durationable = false;

  constructor() {}

  listTypes: SelectItem[] = [];
  searchOpts: SelectItem[] = [];

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

  on = {
    change: () => {
      this.optionChange.emit(this.option);
    },
    duration: () => {
      this.durationChange.emit(this.duration);
    },
    search: () => {
      this.search.emit(this.option);
    },

    key: (item: SelectItem) => {
      this.option.key = item.value;
      this.on.change();
    },

    filter: () => {
      this.filter.emit();
    },

    type: () => {
      this.typeChange.emit(this.type);
    }
  };
}

export enum ListType {
  table,
  card
}

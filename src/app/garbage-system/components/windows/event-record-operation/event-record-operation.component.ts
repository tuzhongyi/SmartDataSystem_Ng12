import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { Enum } from 'src/app/enum/enum-helper';

@Component({
  selector: 'howell-event-record-operation',
  templateUrl: './event-record-operation.component.html',
  styleUrls: ['./event-record-operation.component.less'],
})
export class EventRecordOperationComponent implements OnInit {
  listTypes: SelectItem[] = [];

  text: string = '';

  constructor() {
    let typeEnum = new Enum(ListType);
    this.listTypes = typeEnum.toArray().map((x) => {
      let item = new SelectItem();
      item.key = x;

      switch (x) {
        case ListType.table:
          item.language = '<i class="howell-icon-ul"></i>';
          break;
        case ListType.card:
          item.language = '<i class="howell-icon-cam-all1"></i>';
          break;

        default:
          break;
      }
      item.value = x;
      return item;
    });
  }

  ngOnInit(): void {}

  @Output() search: EventEmitter<string> = new EventEmitter();
  @Output() filter: EventEmitter<void> = new EventEmitter();
  @Output() typeChange: EventEmitter<ListType> = new EventEmitter();

  onsearch() {
    this.search.emit(this.text);
  }
  onfilter() {
    this.filter.emit();
  }

  onListTypeSelect(item: SelectItem){    
    this.typeChange.emit(item.value)
  }
}

export enum ListType {
  table,
  card,
}

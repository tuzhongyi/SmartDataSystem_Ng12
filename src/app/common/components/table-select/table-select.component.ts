import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TableSelectType } from 'src/app/enum/table-select-type.enum';
import { TableSelectStrategy } from 'src/app/view-model/table-select.model';
import { config } from './config';
@Component({
  selector: 'app-table-select',
  templateUrl: './table-select.component.html',
  styleUrls: ['./table-select.component.less'],
})
export class TableSelectComponent implements OnInit {
  config: TableSelectStrategy[] = Array.from(config);

  @Output() tableSelect = new EventEmitter<TableSelectType>();

  constructor() {}

  ngOnInit(): void {}

  clickItem(type: TableSelectType) {
    this.tableSelect.emit(type);
  }
}

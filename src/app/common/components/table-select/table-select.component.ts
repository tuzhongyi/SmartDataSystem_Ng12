import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TableSelectStateEnum } from 'src/app/enum/table-select-state.enum';
import { TableSelectStrategy } from 'src/app/view-model/table-select.model';
import { config } from './config';
@Component({
  selector: 'app-table-select',
  templateUrl: './table-select.component.html',
  styleUrls: ['./table-select.component.less'],
})
export class TableSelectComponent implements OnInit {
  config: TableSelectStrategy[] = Array.from(config);

  @Output() tableSelect = new EventEmitter<TableSelectStateEnum>();

  constructor() { }

  ngOnInit(): void { }

  clickItem(type: TableSelectStateEnum) {
    this.tableSelect.emit(type);
  }
}

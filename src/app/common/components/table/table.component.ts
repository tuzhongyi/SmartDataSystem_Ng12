import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { SelectEnum } from 'src/app/enum/select.enum';
import {
  TableCellEvent,
  TableCellModel,
  TableColumnModel,
} from 'src/app/view-model/table.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
})
export class TableComponent implements OnInit {
  private selection!: SelectionModel<TableCellModel>;

  @Input()
  dataSource: TableCellModel[] = [];

  @Input()
  columns: TableColumnModel[] = [];

  @Input()
  displayedColumns: string[] = [];

  @Input('tableSelectModel')
  selectModel = SelectEnum.Single;

  @Output() selectTableRow: EventEmitter<any> =
    new EventEmitter<TableCellModel>();

  @Output() selectTableCell: EventEmitter<TableCellEvent> =
    new EventEmitter<TableCellEvent>();

  highLight = (model: TableCellModel) => {
    return this.selection.isSelected(model);
  };

  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    console.log(this.selectModel);
    if (this.selectModel == SelectEnum.Single) {
      this.selection = new SelectionModel<TableCellModel>();
    } else {
      this.selection = new SelectionModel<TableCellModel>(true);
    }
    this.selection.changed.subscribe((change) => {
      this.selectTableRow.emit(change.source.selected);
    });
  }
  clickRow(row: TableCellModel) {
    this.selection.toggle(row);
  }
  clickCell(column: TableColumnModel, event: Event) {
    this.selectTableCell.emit({
      column,
      event,
    } as TableCellEvent);
  }
}

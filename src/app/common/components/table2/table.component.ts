import { SelectionModel } from '@angular/cdk/collections';
import { outputAst } from '@angular/compiler';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { SelectEnum } from 'src/app/enum/select.enum';
import {
  TableCellEvent,
  TableColumnModel,
  TableRowModels,

} from 'src/app/view-model/table.model';

@Component({
  selector: 'app-table2',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
})
export class Table2Component implements OnInit, OnChanges, AfterViewInit {
  private selection!: SelectionModel<TableRowModels>;

  dataSource: TableRowModels[] = [];

  @Input()
  dataSubject = new BehaviorSubject<TableRowModels[]>([]);

  @ViewChild('table') table!: MatTable<any>;

  @Input()
  columns: TableColumnModel[] = [];

  @Input()
  displayedColumns: string[] = [];

  @Input('tableSelectModel')
  selectModel = SelectEnum.Single;

  @Output() selectTableRow: EventEmitter<TableRowModels[]> = new EventEmitter<
    TableRowModels[]
  >();

  @Output() selectTableCell: EventEmitter<TableCellEvent> =
    new EventEmitter<TableCellEvent>();

  @Output() sortTableHeader: EventEmitter<Sort> = new EventEmitter<Sort>();

  highLight = (model: TableRowModels) => {
    return this.selection.isSelected(model);
  };

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // console.log(this.selectModel);
    if (this.selectModel == SelectEnum.Single) {
      this.selection = new SelectionModel<TableRowModels>();
    } else {
      this.selection = new SelectionModel<TableRowModels>(true);
    }
    this.selection.changed.subscribe((change) => {
      this.selectTableRow.emit(change.source.selected);
    });
  }
  ngOnChanges(changes: SimpleChanges): void { }
  ngAfterViewInit(): void {
    this.dataSubject.subscribe((data) => {
      this.dataSource = data;
      console.log(data)
      this.table.renderRows();
      if (this.selection) {
        this.selection.clear();
      }
    });
  }
  clickRow(row: TableRowModels) {
    this.selection.toggle(row);
  }
  clickCell(column: TableColumnModel, event: Event) {
    console.log('click cell');
    this.selectTableCell.emit({
      column,
      event,
    } as TableCellEvent);
  }
  selectAll() {
    console.log('全选');
    this.selection.select(...this.dataSource);
  }
  selectReverse() {
    this.dataSource.forEach((data) => this.selection.toggle(data));
  }
  selectCancel() {
    this.selection.clear();
  }
  sortChange(sort: Sort) {
    // console.log(sort);
    this.sortTableHeader.emit(sort);
  }
}

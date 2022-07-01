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
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import {
  TableCellEvent,
  TableColumnModel,
  TableRowModel,

} from 'src/app/view-model/table.model';

@Component({
  selector: 'app-table2',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
})
export class Table2Component implements OnInit, OnChanges, AfterViewInit {
  private selection!: SelectionModel<TableRowModel>;

  dataSource: TableRowModel[] = [];

  @Input()
  dataSubject = new BehaviorSubject<TableRowModel[]>([]);

  @ViewChild('table') table!: MatTable<any>;

  @Input()
  columns: TableColumnModel[] = [];

  @Input()
  displayedColumns: string[] = [];

  @Input('tableSelectModel')
  selectModel = SelectStrategy.Single;

  @Output() selectTableRow: EventEmitter<TableRowModel[]> = new EventEmitter<
    TableRowModel[]
  >();

  @Output() selectTableCell: EventEmitter<TableCellEvent> =
    new EventEmitter<TableCellEvent>();

  @Output() sortTableHeader: EventEmitter<Sort> = new EventEmitter<Sort>();

  highLight = (model: TableRowModel) => {
    return this.selection.isSelected(model);
  };

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // console.log(this.selectModel);
    if (this.selectModel == SelectStrategy.Single) {
      this.selection = new SelectionModel<TableRowModel>();
    } else {
      this.selection = new SelectionModel<TableRowModel>(true);
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
  clickRow(row: TableRowModel) {
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

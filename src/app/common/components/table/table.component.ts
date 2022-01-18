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
  TableCellModel,
  TableColumnModel,
} from 'src/app/view-model/table.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
})
export class TableComponent implements OnInit, OnChanges, AfterViewInit {
  private selection!: SelectionModel<TableCellModel>;

  dataSource: TableCellModel[] = [];

  @Input()
  dataSubject = new BehaviorSubject<TableCellModel[]>([]);

  @ViewChild('table') table!: MatTable<any>;

  @Input()
  columns: TableColumnModel[] = [];

  @Input()
  displayedColumns: string[] = [];

  @Input('tableSelectModel')
  selectModel = SelectEnum.Single;

  @Output() selectTableRow: EventEmitter<TableCellModel[]> = new EventEmitter<
    TableCellModel[]
  >();

  @Output() selectTableCell: EventEmitter<TableCellEvent> =
    new EventEmitter<TableCellEvent>();

  @Output() sortTableHeader: EventEmitter<Sort> = new EventEmitter<Sort>();

  highLight = (model: TableCellModel) => {
    return this.selection.isSelected(model);
  };

  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    // console.log(this.selectModel);
    if (this.selectModel == SelectEnum.Single) {
      this.selection = new SelectionModel<TableCellModel>();
    } else {
      this.selection = new SelectionModel<TableCellModel>(true);
    }
    this.selection.changed.subscribe((change) => {
      this.selectTableRow.emit(change.source.selected);
    });
  }
  ngOnChanges(changes: SimpleChanges): void {}
  ngAfterViewInit(): void {
    this.dataSubject.subscribe((data) => {
      this.dataSource = data;
      this.table.renderRows();
      if (this.selection) {
        this.selection.clear();
      }
    });
  }
  clickRow(row: TableCellModel) {
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

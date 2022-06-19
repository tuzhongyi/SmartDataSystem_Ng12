import { SelectionModel } from "@angular/cdk/collections";
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { Sort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";
import { DomSanitizer } from "@angular/platform-browser";
import { BehaviorSubject } from "rxjs";
import { SelectEnum } from "src/app/enum/select.enum";
import { TableCellEvent, TableColumnModel, TableOperateModel, TableRowModels } from "src/app/view-model/table.model";
import { TableDataSource } from "./data-source";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
})
export class TableComponent implements OnInit {
  private selection!: SelectionModel<TableRowModels>;

  dataSource = new TableDataSource([]);


  highLight = (model: TableRowModels) => {
    return this.selection.isSelected(model);
  };


  @ViewChild('table') table!: MatTable<any>;


  @Input()
  tableOperates: TableOperateModel[] = []

  @Input('tableSelectModel')
  selectModel = SelectEnum.Single;

  // 组件更新数据时，自动更新 table 数据
  @Input()
  dataSubject = new BehaviorSubject<TableRowModels>([]);

  // 表格的元数据配置
  @Input()
  columnModel: TableColumnModel[] = [];

  // 要显示的列
  @Input()
  displayedColumns: string[] = [];

  @Input() zoomIn = false

  @Output() selectTableRow: EventEmitter<TableRowModels[]> = new EventEmitter<
    TableRowModels[]
  >();

  @Output() sortDataEvent: EventEmitter<Sort> = new EventEmitter<Sort>();

  @Output() selectTableCell: EventEmitter<TableCellEvent> =
    new EventEmitter<TableCellEvent>();

  // 如果没有 sanitizer,则传入的id会丢失
  constructor(public sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    if (this.tableOperates.length) this.displayedColumns.push('Operation')
    if (this.selectModel == SelectEnum.Single) {
      this.selection = new SelectionModel<TableRowModels>();
    } else {
      this.selection = new SelectionModel<TableRowModels>(true);
    }
    this.selection.changed.subscribe((change) => {
      this.selectTableRow.emit(change.source.selected);
    });

    this.dataSubject.subscribe(data => {
      // 由于新数据引用不同
      let selected = this.selection.selected;
      for (let i = 0; i < selected.length; i++) {
        let item = selected[i];
        let d = data.find((d: any) => d.Id == item.Id);
        if (d) {
          this.selection.deselect(item);
          this.selection.select(d)
        }

      }
      this.dataSource.setData(data)
    })
  }
  clickRow(row: TableRowModels) {
    this.selection.toggle(row);
  }
  clickCell(column: TableColumnModel, row: TableRowModels, event: Event) {
    this.selectTableCell.emit({
      column,
      row,
      event,
    } as TableCellEvent);
    if (column.stopPropogate) {
      event.stopPropagation();
    }
  }

  selectAll() {
    this.selection.select(...this.dataSource.getData());
  }
  selectReverse() {

    this.dataSource.getData().forEach((data) => this.selection.toggle(data));

  }
  selectCancel() {
    this.selection.clear();
  }
  sortData(sort: Sort) {
    this.sortDataEvent.emit(sort);
  }


  trackBy(index: number, item: any) {
    return item.Id;
  }
  /**
   * 本地的删除，业务上会删除后重新请求数据
   */
  deleteRows(rows: TableRowModels[]) {

    this.selection.deselect(...rows);

    let data = this.dataSource.getData();
    let res = data.filter(d => rows.findIndex(row => row.Id == d.Id) == -1)
    this.dataSubject.next(res)
  }
}

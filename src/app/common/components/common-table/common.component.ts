import { SelectionModel } from "@angular/cdk/collections";
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { Sort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";
import { BehaviorSubject } from "rxjs";
import { SelectStrategy } from "src/app/enum/select-strategy.enum";
import { TableCellEvent, TableColumnModel, TableOperateModel, TableRowModel } from "src/app/view-model/table.model";
import { TableDataSource } from "./data-source";

@Component({
  selector: 'common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.less'],
  exportAs: "commonTable"
})
export class CommonTableComponent implements OnInit {
  private selection!: SelectionModel<TableRowModel>;

  dataSource = new TableDataSource([]);

  highLight = (model: TableRowModel) => {
    return this.selection.isSelected(model);
  };

  // 组件更新数据时，自动更新 table 数据
  @Input()
  dataSubject = new BehaviorSubject<TableRowModel>([]);

  // 表格的元数据配置
  @Input()
  columnModel: TableColumnModel[] = [];

  // 要显示的列
  @Input()
  displayedColumns: string[] = [];

  // hover是否放大
  @Input() zoomIn = false


  // 操作列
  @Input()
  tableOperates: TableOperateModel[] = []


  // 单选表 || 多选表
  @Input('selectStrategy')
  selectStrategy = SelectStrategy.Single;

  @Output() selectTableRow: EventEmitter<TableRowModel[]> = new EventEmitter<
    TableRowModel[]
  >();

  @Output() sortDataEvent: EventEmitter<Sort> = new EventEmitter<Sort>();

  @Output() selectTableCell: EventEmitter<TableCellEvent> =
    new EventEmitter<TableCellEvent>();

  @ViewChild('table') table!: MatTable<any>;

  constructor() {

  }

  ngOnInit(): void {
    // 如果传入操作数据，则添加操作列
    if (this.tableOperates.length) this.displayedColumns.push('Operation')

    if (this.selectStrategy == SelectStrategy.Single) {
      this.selection = new SelectionModel<TableRowModel>();
    } else {
      this.selection = new SelectionModel<TableRowModel>(true);
    }
    this.selection.changed.subscribe((change) => {
      this.selectTableRow.emit(change.source.selected);
    });

    this.dataSubject.subscribe(data => {
      let selected = this.selection.selected;
      // 页数据切换时，清除状态
      this.selection.clear();

      // 当前页数据更新时，保留状态
      for (let i = 0; i < selected.length; i++) {
        let item = selected[i];
        let d = data.find((d: any) => d.Id == item.Id);
        // 用新对象替换原对象，维持高亮状态
        if (d) {
          this.selection.deselect(item);
          this.selection.select(d)
        }

      }
      this.dataSource.setData(data)
    })
  }
  clickRow(row: TableRowModel) {
    this.selection.toggle(row);
  }
  clickCell(column: TableColumnModel, row: TableRowModel, event: Event) {
    this.selectTableCell.emit({
      column,
      row,
      event,
    } as TableCellEvent);
    // 点击图片时用到
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
  deleteRows(rows: TableRowModel[]) {

    this.selection.deselect(...rows);

    let data = this.dataSource.getData();
    let res = data.filter(d => rows.findIndex(row => row.Id == d.Id) == -1)
    this.dataSubject.next(res)
  }
}

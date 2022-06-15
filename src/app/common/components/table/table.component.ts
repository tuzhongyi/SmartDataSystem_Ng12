import { SelectionModel } from "@angular/cdk/collections";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Sort } from "@angular/material/sort";
import { BehaviorSubject } from "rxjs";
import { SelectEnum } from "src/app/enum/select.enum";
import { TableCellEvent, TableColumnModel, TableRowModels } from "src/app/view-model/table.model";
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

  @Output() selectTableRow: EventEmitter<TableRowModels[]> = new EventEmitter<
    TableRowModels[]
  >();

  @Output() sortDataEvent: EventEmitter<Sort> = new EventEmitter<Sort>();


  @Output() clickTableCellEvent: EventEmitter<TableCellEvent> =
    new EventEmitter<TableCellEvent>();

  constructor() { }

  ngOnInit(): void {
    if (this.selectModel == SelectEnum.Single) {
      this.selection = new SelectionModel<TableRowModels>();
    } else {
      this.selection = new SelectionModel<TableRowModels>(true);
    }
    this.selection.changed.subscribe((change) => {
      this.selectTableRow.emit(change.source.selected);
    });

    this.dataSubject.subscribe(data => {
      this.dataSource.setData(data)
    })
  }
  clickRow(row: TableRowModels) {
    this.selection.toggle(row);
    console.log('click row');
  }
  clickCell(column: TableColumnModel, event: Event) {
    console.log('click cell', column);
    this.clickTableCellEvent.emit({
      column,
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
    // let data = this.dataSource.getData();
    // let selected = this.selection.selected;

    // let res = data.filter(item => {
    //   if (!selected.includes(item)) return true
    //   else return false
    // })

    // // 发送两次事件
    // this.selection.clear();
    // this.selection.select(...res)

    // 遍历数组会发送 lenght 次事件
    this.dataSource.getData().forEach((data) => this.selection.toggle(data));

  }
  selectCancel() {
    this.selection.clear();
  }
  sortData(sort: Sort) {
    this.sortDataEvent.emit(sort);
  }


}

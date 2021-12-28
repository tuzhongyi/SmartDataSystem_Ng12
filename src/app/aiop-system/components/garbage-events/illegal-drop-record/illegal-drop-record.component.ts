import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PagedList } from 'src/app/network/model/page_list.model';
import { IllegalDropRecordModel } from 'src/app/view-model/illegal-drop-record.model';
import {
  TableCellEvent,
  TableColumnModel,
} from 'src/app/view-model/table.model';
import { IllegalDropRecordBusiness } from './illegal-drop-record.business';
import { columns } from './columns';
import { SelectEnum } from 'src/app/enum/select.enum';
import { TableSelectStateEnum } from 'src/app/enum/table-select-state.enum';
import { TableComponent } from 'src/app/common/components/table/table.component';

@Component({
  selector: 'app-illegal-drop-record',
  templateUrl: './illegal-drop-record.component.html',
  styleUrls: ['./illegal-drop-record.component.less'],
  providers: [IllegalDropRecordBusiness, DatePipe],
})
export class IllegalDropRecordComponent implements OnInit {
  /**private */
  private _pageIndex = 1;
  private _pageSize = 9;
  private _pagedList: PagedList<IllegalDropRecordModel> = new PagedList();

  // 当前表格选中状态
  private _tableSelectState: TableSelectStateEnum = TableSelectStateEnum.Cancel;

  /**public */
  show = false;
  dataSource: IllegalDropRecordModel[] = [];
  columns: TableColumnModel[] = [...columns];
  displayedColumns: string[] = this.columns.map((column) => column.columnDef);
  tableSelectModel = SelectEnum.Multiple;

  @ViewChild(TableComponent) table?: TableComponent;

  constructor(private _business: IllegalDropRecordBusiness) {
    this._pagedList.Data = [];
    this.dataSource = this._pagedList.Data;

    this._business._dataStream.subscribe(
      (res: PagedList<IllegalDropRecordModel>) => {
        this.dataSource = res.Data;
        this._pagedList = res;
      }
    );
  }

  ngOnInit(): void {
    this.initialize();
  }
  async initialize() {
    let res = await this._business.loadData(this._pageIndex);
  }
  async prev() {
    let res = await this._business.loadData(--this._pageIndex);
  }
  async next() {
    let res = await this._business.loadData(++this._pageIndex);
  }
  selectTableRow(row: IllegalDropRecordModel[]) {
    console.log('row', row);
  }
  selectTableCell({ column, event }: TableCellEvent) {
    if (column.columnDef == 'ImageUrl' || column.columnDef == 'Operation') {
      // console.log(event);
      let path = event.composedPath();
      // console.log(path);
      let flag = path.some((el) => {
        if (el instanceof HTMLElement) {
          return (
            el.nodeName.toLocaleLowerCase() == 'span' &&
            (el.classList.contains('picture') ||
              el.classList.contains('operate'))
          );
        }
        return false;
      });
      if (flag) {
        event.stopPropagation();
      }
    }
  }
  tableSelect(type: TableSelectStateEnum) {
    console.log(type);
    if (this.table) {
      switch (type) {
        case TableSelectStateEnum.All:
          this.table.selectAll();
          break;
        case TableSelectStateEnum.Reverse:
          this.table.selectReverse();
          break;
        case TableSelectStateEnum.Cancel:
          this.table.selectCancel();
          break;
        default:
          throw new TypeError('类型错误');
      }
    }
  }
}

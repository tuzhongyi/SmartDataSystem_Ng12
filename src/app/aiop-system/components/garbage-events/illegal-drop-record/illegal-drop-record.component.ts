import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
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
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-illegal-drop-record',
  templateUrl: './illegal-drop-record.component.html',
  styleUrls: ['./illegal-drop-record.component.less'],
  providers: [IllegalDropRecordBusiness, DatePipe],
})
export class IllegalDropRecordComponent implements OnInit {
  /**private */
  private _pageIndex = 1;
  private _pageSize = 3;
  public page: Page | null = null;

  /**public */
  show = false;
  dataSource: IllegalDropRecordModel[] = [];
  columns: TableColumnModel[] = [...columns];
  displayedColumns: string[] = this.columns.map((column) => column.columnDef);
  tableSelectModel = SelectEnum.Multiple;

  selectedRows: IllegalDropRecordModel[] = [];

  @ViewChild(TableComponent) table?: TableComponent;

  constructor(private _business: IllegalDropRecordBusiness) {
    this.dataSource = [];

    this._business._dataStream.subscribe(
      (res: PagedList<IllegalDropRecordModel>) => {
        this.dataSource = res.Data;
        this.page = res.Page;
      }
    );
  }

  ngOnInit(): void {
    this.initialize();
  }
  async initialize() {
    let res = await this._business.loadData(this._pageIndex, this._pageSize);
  }

  selectTableRow(row: IllegalDropRecordModel[]) {
    // console.log('row', row);
    this.selectedRows = row;
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
  pageEvent(pageInfo: PageEvent) {
    // console.log(pageInfo);
    this._pageIndex = pageInfo.pageIndex + 1;
    this._business.loadData(this._pageIndex);
  }
}

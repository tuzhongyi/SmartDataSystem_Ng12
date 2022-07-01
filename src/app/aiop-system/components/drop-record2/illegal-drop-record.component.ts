import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { BehaviorSubject } from 'rxjs';
import { PaginatorComponent } from 'src/app/common/components/paginator/paginator.component';
import { TableComponent } from 'src/app/common/components/table/table.component';
import { Table2Component } from 'src/app/common/components/table2/table.component';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { TableSelectStateEnum } from 'src/app/enum/table-select-state.enum';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { IllegalDropRecordModel } from 'src/app/view-model/illegal-drop-record.model';
import {
  TableColumnModel,
  TableCellEvent,
} from 'src/app/view-model/table.model';
import { columns } from './columns';
import { IllegalDropRecordBusiness } from './illegal-drop-record.business';

@Component({
  selector: 'app-illegal-drop-record2',
  templateUrl: './illegal-drop-record.component.html',
  styleUrls: ['./illegal-drop-record.component.less'],
  providers: [IllegalDropRecordBusiness, DatePipe],
})
export class IllegalDropRecord2Component implements OnInit {
  /**private */

  private _pageSize = 9;

  private _dataSource: IllegalDropRecordModel[] = []; // 表格数据源
  private _sortedDataSource: IllegalDropRecordModel[] = []; // 表格排序后的数据源

  private _endTime = new Date();

  /**public */
  show = false;
  public page: Page | null = null;

  dataSubject = new BehaviorSubject<IllegalDropRecordModel[]>([]);

  columns: TableColumnModel[] = [...columns]; // 表格列配置详情
  displayedColumns: string[] = this.columns.map((column) => column.columnDef); // 表格列 id
  tableSelectModel = SelectStrategy.Multiple;

  selectedRows: IllegalDropRecordModel[] = [];
  pageIndex = 0;
  pagerCount: number = 4;

  @ViewChild(TableComponent) table?: Table2Component;
  @ViewChild(PaginatorComponent) paginator?: PaginatorComponent;

  constructor(private _business: IllegalDropRecordBusiness) {
    this._sortedDataSource = this._dataSource = [];

    this._business._dataStream.subscribe(
      (res: PagedList<IllegalDropRecordModel>) => {
        this._dataSource = res.Data;
        this._sortedDataSource = Array.from(this._dataSource);
        this.page = res.Page;

        this.dataSubject.next(this._dataSource);
      }
    );
  }

  ngOnInit(): void {
    this.initialize();
  }
  async initialize() {
    await this._business.loadData(
      this.pageIndex,
      this._endTime,
      this._pageSize
    );
    // console.log('吼吼吼');
  }

  selectTableRow(row: IllegalDropRecordModel[]) {
    // console.log('row', row);
    this.selectedRows = row;
  }
  selectTableCell({ column, event }: TableCellEvent) {
    console.log(column, event);
    // 特殊处理
    if (column.columnDef == 'ImageUrl' || column.columnDef == 'Operation') {
      // console.log(event);
      let path = event.composedPath();
      // console.log(path);
      let flag = path.some((el) => {
        if (el instanceof HTMLElement) {
          return (
            el.nodeName.toLocaleLowerCase() == 'div' &&
            (el.classList.contains('picture') ||
              el.classList.contains('operate'))
          );
        }
        return false;
      });
      if (flag) {
        console.log('自定义处理');
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
    if (this.pageIndex == pageInfo.pageIndex + 1) return;
    this.pageIndex = pageInfo.pageIndex + 1;
    this._business.loadData(this.pageIndex, this._endTime);
  }
  sortTableHeader(sort: Sort) {
    if (!sort.active || sort.direction == '') {
      this._sortedDataSource = Array.from(this._dataSource);
    } else {
      let isAsc = sort.direction == 'asc';

      this._sortedDataSource.sort((a, b) => {
        switch (sort.active) {
          case 'ResourceName':
            return this._compare(a.ResourceName, b.ResourceName, isAsc);
          case 'StationName':
            return this._compare(a.StationName, b.StationName, isAsc);
          case 'CountyName':
            return this._compare(a.CountyName, b.CountyName, isAsc);
          case 'CommitteeName':
            return this._compare(a.CommitteeName, b.CommitteeName, isAsc);
          default:
            return 0;
        }
      });
    }

    this.dataSubject.next(this._sortedDataSource);
  }
  private _compare(a: string, b: string, isAsc: boolean) {
    if (this._localeCompareSupportsLocales()) {
      let collator = new Intl.Collator('zh-CN', {
        caseFirst: 'upper',
        sensitivity: 'variant',
        numeric: true,
      });
      return collator.compare(a, b) * (isAsc ? 1 : -1);
    } else {
      return (a.length - b.length || a.localeCompare(b)) * (isAsc ? 1 : -1);
    }
  }
  private _localeCompareSupportsLocales() {
    try {
      'foo'.localeCompare('bar', 'i');
    } catch (e: any) {
      return e.name === 'RangeError';
    }
    return false;
  }
}

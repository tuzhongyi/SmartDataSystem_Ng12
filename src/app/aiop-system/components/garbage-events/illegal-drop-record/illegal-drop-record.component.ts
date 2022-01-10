import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { PaginatorComponent } from 'src/app/common/components/paginator/paginator.component';

@Component({
  selector: 'app-illegal-drop-record',
  templateUrl: './illegal-drop-record.component.html',
  styleUrls: ['./illegal-drop-record.component.less'],
  providers: [IllegalDropRecordBusiness, DatePipe],
})
export class IllegalDropRecordComponent implements OnInit {
  /**private */

  private _pageSize = 9;
  public page: Page | null = null;

  /**public */
  show = false;
  dataSource: IllegalDropRecordModel[] = []; // 表格数据源
  columns: TableColumnModel[] = [...columns]; // 表格列配置详情
  displayedColumns: string[] = this.columns.map((column) => column.columnDef); // 表格列 id
  tableSelectModel = SelectEnum.Multiple;

  selectedRows: IllegalDropRecordModel[] = [];
  pageIndex = 0;
  pagerCount: number = 4;

  @ViewChild(TableComponent) table?: TableComponent;
  @ViewChild(PaginatorComponent) paginator?: PaginatorComponent;

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
    await this._business.loadData(this.pageIndex, this._pageSize);
  }

  selectTableRow(row: IllegalDropRecordModel[]) {
    // console.log('row', row);
    this.selectedRows = row;
  }
  selectTableCell({ column, event }: TableCellEvent) {
    // 特殊处理
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
    console.log(pageInfo);
    if (this.pageIndex == pageInfo.pageIndex + 1) return;
    this.pageIndex = pageInfo.pageIndex + 1;
    this._business.loadData(this.pageIndex);
  }
}

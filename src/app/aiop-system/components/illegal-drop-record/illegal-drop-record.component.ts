import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { SelectEnum } from "src/app/enum/select.enum";
import { IllegalDropRecordModel } from "src/app/view-model/illegal-drop-record.model";
import { TableCellEvent, TableColumnModel, TableOperateModel } from "src/app/view-model/table.model";
import { IllegalDropEventRecordConf } from "./illegal-drop-record.config";
import { IllegalDropRecordBusiness } from "./illegal-drop-record.business";
import { TableSelectStateEnum } from "src/app/enum/table-select-state.enum";
import { TableComponent } from "src/app/common/components/table/table.component";
import { PaginatorComponent } from "src/app/common/components/paginator/paginator.component";
import { Sort } from "@angular/material/sort";
import { Page } from "src/app/network/model/page_list.model";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: 'app-illegal-drop-record',
  templateUrl: './illegal-drop-record.component.html',
  styleUrls: ['./illegal-drop-record.component.less'],
  providers: [IllegalDropRecordBusiness, DatePipe],
})
export class IllegalDropRecordComponent implements OnInit {
  /**private */
  private _pageSize = 9;
  private _endTime = new Date();
  private _curDataSource: IllegalDropRecordModel[] = []; // 表格数据源
  private _sortedDataSource: IllegalDropRecordModel[] = []; // 表格排序后的数据源



  dataSubject = new BehaviorSubject<IllegalDropRecordModel[]>([]);
  tableSelectModel = SelectEnum.Multiple;
  columnModel: TableColumnModel[] = [...IllegalDropEventRecordConf]; // 表格列配置详情
  displayedColumns: string[] = this.columnModel.map((model) => model.columnDef); // 表格列 id
  page: Page | null = null;
  pagerCount: number = 4;
  pageIndex = 1;
  selectedRows: IllegalDropRecordModel[] = [];
  tableOperates: TableOperateModel[] = []


  @ViewChild(TableComponent) table?: TableComponent;
  @ViewChild(PaginatorComponent) paginator?: PaginatorComponent;


  constructor(private _business: IllegalDropRecordBusiness) {
    this.tableOperates.push(new TableOperateModel('sync', ['fa', 'fa-retweet', 'operate-icon'], '同步', this._editRow))
    this.tableOperates.push(
      new TableOperateModel(
        'edit',
        ['howell-icon-modification', 'operate-icon'],
        '编辑',
        this._editRow)
    )
    this.tableOperates.push(new TableOperateModel('delete', ['howell-icon-delete-bin', 'operate-icon'], '删除', this._editRow))
  }

  ngOnInit(): void {
    this.init();
  }
  async init() {
    let res = await this._business.loadData(
      this.pageIndex,
      this._endTime,
      this._pageSize
    );

    this.page = res.Page;
    this._curDataSource = res.Data
    this._sortedDataSource = Array.from(res.Data);

    this.dataSubject.next(res.Data)
  }

  tableSelect(type: TableSelectStateEnum) {
    // console.log(type);
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
    if (this.pageIndex == pageInfo.pageIndex + 1) return;
    this.pageIndex = pageInfo.pageIndex + 1;
    this.init();
  }

  selectTableRow(rows: IllegalDropRecordModel[]) {
    this.selectedRows = rows;
  }

  selectTableCell({ column, row, event }: TableCellEvent) {
    console.log(column, row, event);
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
  sortDataEvent(sort: Sort) {
    if (!sort.active || sort.direction == '') {
      this._sortedDataSource = Array.from(this._curDataSource);
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
          case 'CommunityName':
            return this._compare(a.CommunityName, b.CommunityName, isAsc);
          default:
            return 0;
        }
      });

    }
    this.dataSubject.next(this._sortedDataSource)
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
  private _editRow() {
    console.log('eieieie')
  }


}

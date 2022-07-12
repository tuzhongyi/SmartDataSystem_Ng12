import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject } from 'rxjs';
import { CommonTableComponent } from 'src/app/common/components/common-table/common.component';
import { PaginatorComponent } from 'src/app/common/components/paginator/paginator.component';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { TableSelectStateEnum } from 'src/app/enum/table-select-state.enum';
import { Page } from 'src/app/network/model/page_list.model';
import { AICameraManageModel } from 'src/app/view-model/ai-camera-manage.model';
import { TableColumnModel, TableOperateModel } from 'src/app/view-model/table.model';
import { CameraManageBusiness } from './camera-manage.business';
import { CameraManageConf } from './camera-manage.config'

@Component({
  selector: 'howell-camera-manage',
  templateUrl: './camera-manage.component.html',
  styleUrls: ['./camera-manage.component.less'],
  providers: [
    CameraManageBusiness
  ]
})
export class CameraManageComponent implements OnInit {
  private _pageSize = 3;
  private _condition = '';


  //Table
  dataSubject = new BehaviorSubject<AICameraManageModel[]>([]);
  selectStrategy = SelectStrategy.Multiple;
  columnModel: TableColumnModel[] = [...CameraManageConf]; // 表格列配置详情
  displayedColumns: string[] = this.columnModel.map((model) => model.columnDef); // 表格列 id
  tableOperates: TableOperateModel[] = [];

  selectedRows: AICameraManageModel[] = []; //table选中项
  willBeDeleted: AICameraManageModel[] = [];


  // Paginator
  page: Page | null = null;
  pagerCount: number = 4;
  pageIndex = 1;


  @ViewChild(CommonTableComponent) table?: CommonTableComponent;
  @ViewChild(PaginatorComponent) paginator?: PaginatorComponent;

  constructor(private _business: CameraManageBusiness) { }

  ngOnInit(): void {
    this._init();
  }
  private async _init() {
    let res = await this._business.init(
      this._condition,
      this.pageIndex,
      this._pageSize
    );
    this.page = res.Page;
    this.dataSubject.next(res.Data);
  }

  async searchEvent(condition: string) {
    this._condition = condition;
    this.pageIndex = 1;
    this._init();
  }

  selectTableRow(rows: AICameraManageModel[]) {
    this.selectedRows = rows;
  }
  tableSelect(type: TableSelectStateEnum) {
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
    this._init();
  }

}

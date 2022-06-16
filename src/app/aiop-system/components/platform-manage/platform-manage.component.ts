import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlatformManageModel } from 'src/app/view-model/platform-manage.model';
import { TableCellEvent, TableColumnModel } from 'src/app/view-model/table.model';
import { PlatformManageConf } from './platform-manage.config';
import { PlatformManageBusiness } from './platform-manage.business';
import { Page } from 'src/app/network/model/page_list.model';
import { TableComponent } from 'src/app/common/components/table/table.component';
import { PaginatorComponent } from 'src/app/common/components/paginator/paginator.component';
import { PageEvent } from '@angular/material/paginator';
import { SelectEnum } from 'src/app/enum/select.enum';
import { TableSelectStateEnum } from 'src/app/enum/table-select-state.enum';
import { FormState } from 'src/app/enum/form-state.enum';

@Component({
  selector: 'howell-platform-manage',
  templateUrl: './platform-manage.component.html',
  styleUrls: ['./platform-manage.component.less'],
  providers: [
    PlatformManageBusiness
  ]
})
export class PlatformManageComponent implements OnInit {
  /**private */
  private _pageSize = 9;


  dataSource: PlatformManageModel[] = [];
  dataSubject = new BehaviorSubject<PlatformManageModel[]>([]);
  tableSelectModel = SelectEnum.Multiple;
  columnModel: TableColumnModel[] = [...PlatformManageConf]; // 表格列配置详情
  displayedColumns: string[] = this.columnModel.map((model) => model.columnDef); // 表格列 id
  page: Page | null = null;
  pagerCount: number = 4;
  pageIndex = 1;
  selectedRows: PlatformManageModel[] = [];
  showDialog = false;
  state = FormState.none;

  get enableDelBtn() {
    return !!this.selectedRows.length
  }

  @ViewChild(TableComponent) table?: TableComponent;
  @ViewChild(PaginatorComponent) paginator?: PaginatorComponent;



  constructor(private _business: PlatformManageBusiness,) {

  }


  ngOnInit(): void {
    this.init();
  }
  async init() {
    let res = await this._business.loadData(
      this.pageIndex,
      this._pageSize
    );


    this.page = res.Page;
    this.dataSubject.next(res.Data)
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
  selectTableRow(rows: PlatformManageModel[]) {
    this.selectedRows = rows;
  }
  selectTableCell({ column, event }: TableCellEvent) {
    console.log(column, event);
    // // 特殊处理
    if (column.columnDef == 'Operation') {
      let target = event.target as HTMLElement;
      if (target.id == 'sync') {
        console.log('sync')
      } else if (target.id == 'edit') {
        console.log('edit')
      } else if (target.id == 'delete') {
        console.log('delete')
      }
    }
  }
  pageEvent(pageInfo: PageEvent) {
    if (this.pageIndex == pageInfo.pageIndex + 1) return;
    this.pageIndex = pageInfo.pageIndex + 1;
    this.init();
  }

  addBtnClick() {
    this.state = FormState.add;
    this.showDialog = true;
  }
}

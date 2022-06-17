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
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogEnum } from 'src/app/enum/confim-dialog.enum';
import { ConfirmDialogModel } from 'src/app/view-model/confirm-dialog.model';

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
  selectedRows: PlatformManageModel[] = [];//table选中项
  willBeDeleted: PlatformManageModel[] = [];
  showDialog = false;
  showConfirm = false;
  dialogModel = new ConfirmDialogModel('确认删除', '删除该项');

  state = FormState.none;
  platformId = '';

  get enableDelBtn() {
    return !!this.selectedRows.length
  }

  @ViewChild(TableComponent) table?: TableComponent;
  @ViewChild(PaginatorComponent) paginator?: PaginatorComponent;



  constructor(private _business: PlatformManageBusiness, private _toastrService: ToastrService) {

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
  async selectTableCell({ column, row, event }: TableCellEvent) {
    // console.log(column, row, event);
    // // 特殊处理
    if (column.columnDef == 'Operation') {
      let target = event.target as HTMLElement;
      if (target.id == 'sync') {
        console.log('sync')
      } else if (target.id == 'edit') {
        // console.log('edit')
        this.showDialog = true;
        this.state = FormState.edit;
        this.platformId = row.Id;
      } else if (target.id == 'delete') {

        this.willBeDeleted = [row];
        this.showConfirm = true;
        this.dialogModel.content = `删除${this.willBeDeleted.length}个选项?`

      }
    }
  }
  pageEvent(pageInfo: PageEvent) {
    if (this.pageIndex == pageInfo.pageIndex + 1) return;
    this.pageIndex = pageInfo.pageIndex + 1;
    this.init();
  }

  closeForm(update: boolean) {
    this.showDialog = false
    this.state = FormState.none;
    if (update) this.init();
  }
  addBtnClick() {
    this.state = FormState.add;
    this.showDialog = true;
  }
  deleteBtnClick() {
    // this._deleteRows(this.selectedRows)
    this.willBeDeleted = [...this.selectedRows]
    this.showConfirm = true;
    this.dialogModel.content = `删除${this.willBeDeleted.length}个选项?`
  }

  async dialogMsgEvent(status: ConfirmDialogEnum) {
    this.showConfirm = false;
    if (status == ConfirmDialogEnum.confirm) {
      this._deleteRows(this.willBeDeleted)
    } else if (status == ConfirmDialogEnum.cancel) {

    }
  }
  private async _deleteRows(rows: PlatformManageModel[]) {
    for (let i = 0; i < rows.length; i++) {
      let id = rows[i].Id;
      await this._business.delete(id)
      this._toastrService.success('删除成功');

    }
    if (this.table) {
      this.table.deleteRows(rows);
      this.init();
    }
  }
}

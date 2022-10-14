import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  PlatformManageModel,
  PlatformManageSearch,
} from 'src/app/view-model/platform-manage.model';
import {
  TableCellEvent,
  TableColumnModel,
  TableOperateModel,
  TableRowModel,
} from 'src/app/view-model/table.model';
import { PlatformManageConf } from './platform-manage.config';
import { PlatformManageBusiness } from './platform-manage.business';
import { Page } from 'src/app/network/model/page_list.model';
import { CommonTableComponent } from 'src/app/common/components/common-table/common.component';
import { PaginatorComponent } from 'src/app/common/components/paginator/paginator.component';
import { PageEvent } from '@angular/material/paginator';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { TableSelectStateEnum } from 'src/app/enum/table-select-state.enum';
import { FormState } from 'src/app/enum/form-state.enum';
import { ToastrService } from 'ngx-toastr';
import { DialogEnum } from 'src/app/enum/dialog.enum';
import { ConfirmDialogModel } from 'src/app/view-model/confirm-dialog.model';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'howell-platform-manage',
  templateUrl: './platform-manage.component.html',
  styleUrls: ['./platform-manage.component.less'],
  providers: [PlatformManageBusiness],
})
export class PlatformManageComponent implements OnInit {
  // Table
  dataSubject = new BehaviorSubject<PlatformManageModel[]>([]);
  selectStrategy = SelectStrategy.Multiple;
  columnModel: TableColumnModel[] = [...PlatformManageConf]; // 表格列配置详情
  displayedColumns: string[] = this.columnModel.map((model) => model.columnDef); // 表格列 id
  tableOperates: TableOperateModel[] = [];
  selectedRows: PlatformManageModel[] = []; //table选中项
  willBeDeleted: PlatformManageModel[] = [];

  // Paginator
  page: Page = {
    PageIndex: 0,
    PageSize: 0,
    RecordCount: 0,
    TotalRecordCount: 0,
    PageCount: 0,
  };

  searchInfo: PlatformManageSearch = {
    Condition: '',
    PageIndex: 1,
    PageSize: 9,
  };

  // 对话框
  showOperate = false;
  showConfirm = false;
  dialogModel = new ConfirmDialogModel('确认删除', '删除该项');

  // 表单
  state = FormState.none;
  operateId = '';

  get enableDelBtn() {
    return !!this.selectedRows.length;
  }

  @ViewChild(CommonTableComponent) table?: CommonTableComponent;
  @ViewChild(PaginatorComponent) paginator?: PaginatorComponent;

  constructor(
    private _business: PlatformManageBusiness,
    private _toastrService: ToastrService
  ) {
    this.tableOperates.push(
      new TableOperateModel(
        'sync',
        ['fa', 'fa-retweet', 'operate-icon'],
        '同步',
        this._clickSyncBtn.bind(this)
      ),
      new TableOperateModel(
        'edit',
        ['howell-icon-modification', 'operate-icon'],
        '编辑',
        this._clickEditBtn.bind(this)
      ),
      new TableOperateModel(
        'delete',
        ['howell-icon-delete-bin', 'operate-icon'],
        '删除',
        this._clickDelBtn.bind(this)
      )
    );
  }

  ngOnInit(): void {
    this._init();
  }
  private async _init() {
    let res = await this._business.init(this.searchInfo);
    this.page = res.Page;
    this.dataSubject.next(res.Data);
  }

  async searchEvent(condition: string) {
    this.searchInfo.Condition = condition;
    this.searchInfo.PageIndex = 1;
    this._init();
  }
  selectTableRow(rows: PlatformManageModel[]) {
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
    if (this.searchInfo.PageIndex == pageInfo.pageIndex + 1) return;
    this.searchInfo.PageIndex = pageInfo.pageIndex + 1;
    this._init();
  }

  closeForm(update: boolean) {
    this.showOperate = false;
    this.state = FormState.none;
    this.operateId = '';
    if (update) {
      this.searchInfo.PageIndex = 1;
      this._init();
    }
  }
  addBtnClick() {
    this.state = FormState.add;
    this.showOperate = true;
  }
  deleteBtnClick() {
    this.willBeDeleted = [...this.selectedRows];
    this.showConfirm = true;
    this.dialogModel.content = `删除${this.willBeDeleted.length}个选项?`;
  }

  async dialogMsgEvent(status: DialogEnum) {
    this.showConfirm = false;
    if (status == DialogEnum.confirm) {
      this._deleteRows(this.willBeDeleted);
    } else if (status == DialogEnum.cancel) {
    }
  }

  private async _deleteRows(rows: PlatformManageModel[]) {
    this.table?.deleteRows(rows);
    for (let i = 0; i < rows.length; i++) {
      let id = rows[i].Id;
      await this._business.delete(id);
      this._toastrService.success('删除成功');
      if (this.page.RecordCount == 1) {
        this.searchInfo.PageIndex = Math.max(this.searchInfo.PageIndex - 1, 1);
      }
    }
    this._init();
  }
  private async _clickSyncBtn(row: PlatformManageModel, event: Event) {
    let res = await this._business.sync(row.Id);
    if (res) {
      this._toastrService.success('同步成功');
    }
  }
  private _clickEditBtn(row: PlatformManageModel, event: Event) {
    this.showOperate = true;
    this.state = FormState.edit;
    this.operateId = row.Id;
  }
  private _clickDelBtn(row: PlatformManageModel, event: Event) {
    this.willBeDeleted = [row];
    this.showConfirm = true;
    this.dialogModel.content = `删除${this.willBeDeleted.length}个选项?`;
  }
}

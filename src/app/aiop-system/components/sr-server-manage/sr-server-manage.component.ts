import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { PaginatorComponent } from 'src/app/common/components/paginator/paginator.component';
import { CommonTableComponent } from 'src/app/common/components/common-table/common.component';
import { DialogEnum } from 'src/app/enum/dialog.enum';
import { FormState } from 'src/app/enum/form-state.enum';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { TableSelectType } from 'src/app/enum/table-select-type.enum';
import { Page } from 'src/app/network/model/page_list.model';
import { ConfirmDialogModel } from 'src/app/view-model/confirm-dialog.model';
import { SRServerManageModel } from 'src/app/view-model/sr-server-manage.model';
import {
  TableCellEvent,
  TableColumnModel,
  TableOperateModel,
} from 'src/app/view-model/table.model';
import { SRServerManageConf } from './sr-server-manage..config';
import { SRServerManageBusiness } from './sr-server-manage.business';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'howell-sr-server-manage',
  templateUrl: './sr-server-manage.component.html',
  styleUrls: ['./sr-server-manage.component.less'],
  providers: [SRServerManageBusiness],
})
export class SRServerManageComponent implements OnInit {
  /**private */
  private _condition = '';

  // Table
  dataSubject = new BehaviorSubject<SRServerManageModel[]>([]);
  selectStrategy = SelectStrategy.Multiple;
  columnModel: TableColumnModel[] = [...SRServerManageConf]; // 表格列配置详情
  displayedColumns: string[] = this.columnModel.map((model) => model.columnDef); // 表格列 id
  selectedRows: SRServerManageModel[] = []; //table选中项
  willBeDeleted: SRServerManageModel[] = [];

  // 对话框
  showDialog = false;
  showConfirm = false;
  dialogModel = new ConfirmDialogModel('确认删除', '删除该项');

  // 表单
  state = FormState.none;
  tableOperates: TableOperateModel[] = [];
  operateId: string = '';

  get enableDelBtn() {
    return !!this.selectedRows.length;
  }

  @ViewChild(CommonTableComponent) table?: CommonTableComponent;
  @ViewChild(PaginatorComponent) paginator?: PaginatorComponent;

  constructor(
    private _business: SRServerManageBusiness,
    private _toastrService: ToastrService
  ) {
    this.tableOperates.push(
      new TableOperateModel(
        'sync',
        ['fa', 'fa-retweet', 'operate-icon'],
        '同步',
        this._clickSyncBtn.bind(this)
      )
    );
    this.tableOperates.push(
      new TableOperateModel(
        'edit',
        ['howell-icon-modification', 'operate-icon'],
        '编辑',
        this._clickEditBtn.bind(this)
      )
    );
    this.tableOperates.push(
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
    let res = await this._business.listServers(this._condition);
    this.dataSubject.next(res);
  }

  async searchEvent(condition: string) {
    this._condition = condition;
    this._init();
  }

  selectTableRow(rows: SRServerManageModel[]) {
    this.selectedRows = rows;
  }

  tableSelect(type: TableSelectType) {
    if (this.table) {
      switch (type) {
        case TableSelectType.All:
          this.table.selectAll();
          break;
        case TableSelectType.Reverse:
          this.table.selectReverse();
          break;
        case TableSelectType.Cancel:
          this.table.selectCancel();
          break;
        default:
          throw new TypeError('类型错误');
      }
    }
  }

  closeForm(update: boolean) {
    this.showDialog = false;
    this.state = FormState.none;
    this.operateId = '';
    if (update) {
      this._init();
    }
  }

  addBtnClick() {
    this.state = FormState.add;
    this.showDialog = true;
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
  private async _deleteRows(rows: SRServerManageModel[]) {
    this.table?.deleteRows(rows);
    for (let i = 0; i < rows.length; i++) {
      let id = rows[i].Id;
      await this._business.delete(id);
      this._toastrService.success('删除成功');
    }
    this._init();
  }

  private async _clickSyncBtn(row: SRServerManageModel, event: Event) {
    let res = await this._business.sync(row.Id).catch(() => {
      this._toastrService.error('同步失败');
    });
    if (res) {
      this._toastrService.success('同步成功');
    }
  }
  private _clickEditBtn(row: SRServerManageModel, event: Event) {
    this.showDialog = true;
    this.state = FormState.edit;
    this.operateId = row.Id;
  }
  private _clickDelBtn(row: SRServerManageModel, event: Event) {
    this.willBeDeleted = [row];
    this.showConfirm = true;
    this.dialogModel.content = `删除${this.willBeDeleted.length}个选项?`;
  }
}

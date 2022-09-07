import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { PaginatorComponent } from 'src/app/common/components/paginator/paginator.component';
import { CommonTableComponent } from 'src/app/common/components/common-table/common.component';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { DialogEnum } from 'src/app/enum/dialog.enum';
import { FormState } from 'src/app/enum/form-state.enum';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { TableSelectStateEnum } from 'src/app/enum/table-select-state.enum';
import { Page } from 'src/app/network/model/page_list.model';
import { CameraAIUrl } from 'src/app/network/url/aiop/events/records/camera-ai/camera-ai.url';
import { AIModelManageModel } from 'src/app/view-model/ai-model-manage.model';
import { ConfirmDialogModel } from 'src/app/view-model/confirm-dialog.model';
import {
  TableColumnModel,
  TableOperateModel,
} from 'src/app/view-model/table.model';
import { AIModelManageBusiness } from './ai-model-manage.business';
import { AIModelManageConf } from './ai-model-manage.config';

@Component({
  selector: 'howell-ai-model-manage',
  templateUrl: './ai-model-manage.component.html',
  styleUrls: ['./ai-model-manage.component.less'],
  providers: [AIModelManageBusiness],
})
export class AIModelManageComponent implements OnInit {
  private _pageSize = 9;
  private _condition = '';

  // Table
  dataSubject = new BehaviorSubject<AIModelManageModel[]>([]);
  columnModel: TableColumnModel[] = [...AIModelManageConf]; // 表格列配置详情
  displayedColumns: string[] = this.columnModel.map((model) => model.columnDef); // 表格列 id
  tableOperates: TableOperateModel[] = [];
  selectedRows: AIModelManageModel[] = []; //table选中项
  willBeDeleted: AIModelManageModel[] = [];

  // Paginator
  page: Page | null = null;
  pagerCount: number = 4;
  pageIndex = 1;

  // 对话框
  showOperate = false;
  showConfirm = false;
  dialogModel = new ConfirmDialogModel('确认删除', '删除该项');

  // 表单
  state = FormState.none;
  operateId = '';


  get enableDelBtn() {
    return !!this.selectedRows.length
  }

  @ViewChild(CommonTableComponent) table?: CommonTableComponent;
  @ViewChild(PaginatorComponent) paginator?: PaginatorComponent;

  constructor(private _business: AIModelManageBusiness, private _toastrService: ToastrService) {
    this.tableOperates.push(
      new TableOperateModel(
        'edit',
        ['howell-icon-modification'],
        '编辑',
        this._clickEditBtn.bind(this)
      ),
      new TableOperateModel(
        'delete',
        ['howell-icon-delete-bin'],
        '删除',
        this._clickDelBtn.bind(this)
      )
    );
  }

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

  selectTableRow(rows: AIModelManageModel[]) {
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

  closeForm(update: boolean) {
    this.showOperate = false
    this.state = FormState.none;
    this.operateId = '';
    if (update) {
      this.pageIndex = 1;
      this._init();
    }
  }
  addBtnClick() {
    this.state = FormState.add;
    this.showOperate = true;
  }
  deleteBtnClick() {
    this.willBeDeleted = [...this.selectedRows]
    this.showConfirm = true;
    this.dialogModel.content = `删除${this.willBeDeleted.length}个选项?`
  }

  dialogMsgEvent(status: DialogEnum) {
    this.showConfirm = false;
    if (status == DialogEnum.confirm) {
      this._deleteRows(this.willBeDeleted)
    } else if (status == DialogEnum.cancel) {

    }
  }

  private async _deleteRows(rows: AIModelManageModel[]) {
    this.table?.deleteRows(rows);
    for (let i = 0; i < rows.length; i++) {
      let id = rows[i].Id;
      await this._business.delete(id)
      this._toastrService.success('删除成功');
    }

    this.pageIndex = 1;
    this._init();
  }
  private _clickEditBtn(row: AIModelManageModel) {
    this.showOperate = true;
    this.state = FormState.edit;
    this.operateId = row.Id;
  }
  private _clickDelBtn(row: AIModelManageModel) {
    this.willBeDeleted = [row];
    this.showConfirm = true;
    this.dialogModel.content = `删除${this.willBeDeleted.length}个选项?`
  }

}

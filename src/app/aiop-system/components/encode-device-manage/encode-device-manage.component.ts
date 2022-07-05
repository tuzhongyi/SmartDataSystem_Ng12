import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PaginatorComponent } from 'src/app/common/components/paginator/paginator.component';
import { CommonTableComponent } from 'src/app/common/components/common-table/common.component';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { Page } from 'src/app/network/model/page_list.model';
import { EncodeDeviceManageModel } from 'src/app/view-model/encode-device-manage.model';
import { TableColumnModel, TableOperateModel } from 'src/app/view-model/table.model';
import { EncodeDeviceManageBusiness } from './encode-device-manage.business';
import { EncodeDeviceManageConf } from './encode-device-manage.config'
import { PageEvent } from '@angular/material/paginator';
import { TableSelectStateEnum } from 'src/app/enum/table-select-state.enum';
import { ConfirmDialogModel } from 'src/app/view-model/confirm-dialog.model';
import { ConfirmDialogEnum } from 'src/app/enum/confim-dialog.enum';
import { ToastrService } from 'ngx-toastr';
import { FormState } from 'src/app/enum/form-state.enum';

@Component({
  selector: 'howell-encode-device-manage',
  templateUrl: './encode-device-manage.component.html',
  styleUrls: ['./encode-device-manage.component.less'],
  providers: [
    EncodeDeviceManageBusiness
  ]
})
export class EncodeDeviceManageComponent implements OnInit {

  private _pageSize = 3;



  // Table
  dataSubject = new BehaviorSubject<EncodeDeviceManageModel[]>([]);
  selectStrategy = SelectStrategy.Multiple;
  columnModel: TableColumnModel[] = [...EncodeDeviceManageConf]; // 表格列配置详情
  displayedColumns: string[] = this.columnModel.map((model) => model.columnDef); // 表格列 id
  tableOperates: TableOperateModel[] = []
  selectedRows: EncodeDeviceManageModel[] = [];//table选中项
  willBeDeleted: EncodeDeviceManageModel[] = [];


  // Paginator
  page: Page | null = null;
  pagerCount: number = 4;
  pageIndex = 1;


  // 对话框
  showOperate = false;
  showConfirm = false;
  dialogModel = new ConfirmDialogModel('确认删除', '删除该项');

  //搜索
  condition = '';
  showFilter = false;
  disableSearch = false;
  placeHolder = '搜索编码器名称'


  // 表单
  state = FormState.none;
  encodeDeviceId = '';


  get enableDelBtn() {
    return !!this.selectedRows.length
  }


  get enableBindBtn() {
    return !!this.selectedRows.length
  }


  @ViewChild(CommonTableComponent) table?: CommonTableComponent;
  @ViewChild(PaginatorComponent) paginator?: PaginatorComponent;


  constructor(private _business: EncodeDeviceManageBusiness, private _toastrService: ToastrService) {
    this.tableOperates.push(
      new TableOperateModel(
        'edit',
        ['howell-icon-modification'],
        '编辑',
        this._clickEditBtn.bind(this)
      )
    );
  }

  ngOnInit(): void {

    this._init()
  }
  private async _init() {
    let res = await this._business.init(this.condition, this.pageIndex, this._pageSize);
    console.log('编码设备', res)
    this.page = res.Page;
    this.dataSubject.next(res.Data);

  }

  async search() {
    this.pageIndex = 1;
    this._init();
  }

  selectTableRow(rows: EncodeDeviceManageModel[]) {
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


  async dialogMsgEvent(status: ConfirmDialogEnum) {
    this.showConfirm = false;
    if (status == ConfirmDialogEnum.confirm) {
      this._deleteRows(this.willBeDeleted)
    } else if (status == ConfirmDialogEnum.cancel) {

    }
  }
  closeForm(update: boolean) {
    this.showOperate = false
    this.state = FormState.none;
    if (update) this._init();
  }
  showFilterHandler() {

    this.disableSearch = this.showFilter = !this.showFilter;

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

  private async _deleteRows(rows: EncodeDeviceManageModel[]) {
    this.table?.deleteRows(rows);
    for (let i = 0; i < rows.length; i++) {
      let id = rows[i].Id
      let res = await this._business.deleteEncodeDevice(id)
      if (res) this._toastrService.success('删除成功');
    }
    this.pageIndex = 1;
    this._init();

  }

  private _clickEditBtn(row: EncodeDeviceManageModel) {
    this.showOperate = true;
    this.state = FormState.edit;
    this.encodeDeviceId = row.Id;
  }

}

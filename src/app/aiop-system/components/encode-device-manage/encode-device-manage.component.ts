import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import {
  EncodeDeviceManageModel,
  EncodeDeviceManageSearchInfo,
} from 'src/app/aiop-system/components/encode-device-manage/encode-device-manage.model';
import { CommonTableComponent } from 'src/app/common/components/common-table/common.component';
import { PaginatorComponent } from 'src/app/common/components/paginator/paginator.component';
import { DialogEnum } from 'src/app/enum/dialog.enum';
import { FormState } from 'src/app/enum/form-state.enum';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { TableSelectType } from 'src/app/enum/table-select-type.enum';
import { Page } from 'src/app/network/model/page_list.model';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import {
  TableCellEvent,
  TableColumnModel,
  TableOperateModel,
} from 'src/app/view-model/table.model';
import { EncodeDeviceManageBusiness } from './encode-device-manage.business';
import { EncodeDeviceManageConf } from './encode-device-manage.config';
import { EncodeDeviceManageWindow } from './encode-device-manage.window';

@Component({
  selector: 'howell-encode-device-manage',
  templateUrl: './encode-device-manage.component.html',
  styleUrls: ['./encode-device-manage.component.less'],
  providers: [EncodeDeviceManageBusiness],
})
export class EncodeDeviceManageComponent implements OnInit {
  private _pageSize = 9;

  // Table
  dataSubject = new BehaviorSubject<EncodeDeviceManageModel[]>([]);
  selectStrategy = SelectStrategy.Multiple;
  columnModel: TableColumnModel[] = [...EncodeDeviceManageConf]; // 表格列配置详情
  displayedColumns: string[] = this.columnModel.map((model) => model.columnDef); // 表格列 id
  tableOperates: TableOperateModel[] = [];
  selectedRows: EncodeDeviceManageModel[] = []; //table选中项
  willBeDeleted: EncodeDeviceManageModel[] = [];

  // Paginator
  page: Page | null = null;
  pagerCount: number = 4;
  pageIndex = 1;

  //搜索
  condition = '';
  showFilter = false;
  disableSearch = false;
  placeHolder = '搜索编码器名称';

  //AndLabelIds: ["1bb10bbfa1f546debf5237eeadb57777"]
  searchInfo: EncodeDeviceManageSearchInfo = {
    condition: '',
    deviceName: '',
    ip: '',
    online: '',
    labelIds: [], //["1bb10bbfa1f546debf5237eeadb57777"],
    filter: false,
  };

  // 标签筛选器
  selectedNodes: CommonFlatNode[] = [];
  treeSelectStrategy = SelectStrategy.Multiple;
  defaultIds: string[] = [];
  labelIds: string[] = [];

  get enableDelBtn() {
    return !!this.selectedRows.length;
  }

  get enableBindBtn() {
    return !!this.selectedRows.length;
  }

  @ViewChild(CommonTableComponent) table?: CommonTableComponent;
  @ViewChild(PaginatorComponent) paginator?: PaginatorComponent;

  constructor(
    private fb: FormBuilder,
    private _business: EncodeDeviceManageBusiness,
    private _toastrService: ToastrService
  ) {
    this.tableOperates.push(
      new TableOperateModel(
        'edit',
        ['howell-icon-modification'],
        '编辑',
        this._clickEditBtn.bind(this)
      )
    );
  }

  window = new EncodeDeviceManageWindow();

  ngOnInit(): void {
    this._init();
  }
  private async _init() {
    let res = await this._business.init(
      this.searchInfo,
      this.pageIndex,
      this._pageSize
    );
    // console.log('编码设备', res)
    this.page = res.Page;
    this.dataSubject.next(res.Data);
  }

  search() {
    this.pageIndex = 1;
    this._init();
  }

  selectTableRow(rows: EncodeDeviceManageModel[]) {
    this.selectedRows = rows;
    console.log('选择', rows);
  }
  selectTableCell(e: TableCellEvent<EncodeDeviceManageModel>) {
    console.log(e);
    if (e.column.columnDef == 'Labels') {
      this.window.label.show = true;
      this.window.label.resource = {
        Id: e.row.Id,
        Name: e.row.Name,
      };
    }
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
  pageEvent(pageInfo: PageEvent) {
    if (this.pageIndex == pageInfo.pageIndex + 1) return;
    this.pageIndex = pageInfo.pageIndex + 1;
    this._init();
  }

  // 点击树节点
  selectTreeNode(nodes: CommonFlatNode[]) {
    // console.log('外部结果', nodes)
    this.selectedNodes = nodes;
    this.searchInfo.labelIds = this.selectedNodes.map((n) => n.Id);
  }

  async dialogMsgEvent(status: DialogEnum) {
    this.window.confirm.show = false;
    if (status == DialogEnum.confirm) {
      this._deleteRows(this.willBeDeleted);
    } else if (status == DialogEnum.cancel) {
    }
  }
  closeForm(update: boolean) {
    this.window.operate.show = false;
    this.window.operate.clear();
    if (update) {
      this.pageIndex = 1;
      this._init();
    }
  }
  closeBind(update: boolean) {
    this.window.label.show = false;
    this.window.label.clear();
    if (update) {
      this.pageIndex = 1;
      this._init();
    }
  }
  toggleFilter() {
    this.disableSearch = this.showFilter = !this.showFilter;
    this.searchInfo.filter = this.showFilter;
  }
  addBtnClick() {
    this.window.operate.state = FormState.add;
    this.window.operate.show = true;
  }
  deleteBtnClick() {
    this.willBeDeleted = [...this.selectedRows];
    this.window.confirm.show = true;
    this.window.confirm.dialogModel.content = `删除${this.willBeDeleted.length}个选项?`;
  }

  bindBtnClick() {
    this.window.label.show = true;
    this.window.label.resource = {
      Id: this.selectedRows[0]?.Id || '',
      Name: this.selectedRows[0]?.Name || '',
    };
  }

  private async _deleteRows(rows: EncodeDeviceManageModel[]) {
    this.table?.deleteRows(rows);
    for (let i = 0; i < rows.length; i++) {
      let id = rows[i].Id;
      let res = await this._business.deleteEncodeDevice(id);
      if (res) this._toastrService.success('删除成功');
    }
    this.pageIndex = 1;
    this._init();
  }

  private _clickEditBtn(row: EncodeDeviceManageModel) {
    this.window.operate.state = FormState.edit;
    this.window.operate.resource = {
      Id: row.Id,
      Name: row.Name,
    };
    this.window.operate.show = true;
  }
}

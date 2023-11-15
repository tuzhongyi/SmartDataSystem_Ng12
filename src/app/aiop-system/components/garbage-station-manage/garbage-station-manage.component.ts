import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';

import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject } from 'rxjs';
import { CommonTableComponent } from 'src/app/common/components/common-table/common-table.component';
import { ConfirmDialogModel } from 'src/app/common/components/confirm-dialog/confirm-dialog.model';
import { DivisionTreeComponent } from 'src/app/common/components/division-tree/division-tree.component';
import { DivisionTreeSource } from 'src/app/common/components/division-tree/division-tree.model';
import { PaginatorComponent } from 'src/app/common/components/paginator/paginator.component';
import { DialogEnum } from 'src/app/enum/dialog.enum';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { FormState } from 'src/app/enum/form-state.enum';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { TableSelectType } from 'src/app/enum/table-select-type.enum';
import { DivisionNode } from 'src/app/network/model/garbage-station/division-tree.model';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { Page } from 'src/app/network/model/page_list.model';
import { GarbageStationManageModel } from 'src/app/view-model/garbage-station-manage.model';
import {
  TableColumnModel,
  TableOperateModel,
} from 'src/app/view-model/table.model';
import { GarbageStationManageBusiness } from './garbage-station-manage.business';
import { GarbageStationManageConf } from './garbage-station-manage.config';

@Component({
  selector: 'howell-garbage-station-manage',
  templateUrl: './garbage-station-manage.component.html',
  styleUrls: ['./garbage-station-manage.component.less'],
  providers: [GarbageStationManageBusiness],
})
export class GarbageStationManageComponent implements OnInit {
  private _pageSize = 9;
  private _condition = '';
  private _currentNode?: CommonFlatNode<DivisionTreeSource>;

  //Table
  dataSubject = new BehaviorSubject<GarbageStationManageModel[]>([]);
  selectStrategy = SelectStrategy.Multiple;
  columnModel: TableColumnModel[] = [...GarbageStationManageConf]; // 表格列配置详情
  displayedColumns: string[] = this.columnModel.map((model) => model.columnDef); // 表格列 id
  tableOperates: TableOperateModel[] = [];

  selectedRows: GarbageStationManageModel[] = []; //table选中项
  willBeDeleted: GarbageStationManageModel[] = [];

  // Paginator
  pagerCount: number = 4;
  pageIndex = 1;
  page: Page = {
    PageIndex: this.pageIndex,
    PageSize: this._pageSize,
    RecordCount: 0,
    TotalRecordCount: 0,
    PageCount: 0,
  };

  // 对话框
  showOperate = false;
  showConfirm = false;
  dialogModel = new ConfirmDialogModel('确认删除', '删除该项');

  // 表单
  state = FormState.none;
  stationId = '';
  divisionId = '';

  @ViewChild(CommonTableComponent) table?: CommonTableComponent;
  @ViewChild(PaginatorComponent) paginator?: PaginatorComponent;

  get enableAddBtn() {
    if (this._currentNode) {
      if (
        this._currentNode.RawData instanceof Division ||
        this._currentNode.RawData instanceof DivisionNode
      ) {
        return (
          this._currentNode.RawData.DivisionType === DivisionType.Committees
        );
      }
    }
    return false;
  }

  get enableDelBtn() {
    return !!this.selectedRows.length;
  }

  @ViewChild(DivisionTreeComponent) tree?: DivisionTreeComponent;

  constructor(
    private _business: GarbageStationManageBusiness,
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

  async ngOnInit() {
    // let res = await this._business.listStations()
    // console.log(res);
  }

  private async _init() {
    let res = await this._business.listStations(
      this._currentNode?.Id ?? '',
      this._condition,
      this.pageIndex,
      this._pageSize
    );
    console.log(res);
    this.page = res.Page;
    this.dataSubject.next(res.Data);
  }

  // 点击树节点
  selectTreeNode(nodes: CommonFlatNode<DivisionTreeSource>[]) {
    this._currentNode = nodes[0];
    // console.log('外部结果', nodes);
    this._updateTable();
  }

  selectTableRow(rows: GarbageStationManageModel[]) {
    this.selectedRows = rows;
  }

  async searchEvent(condition: string) {
    this._condition = condition;
    this.pageIndex = 1;
    this._init();
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

  closeForm(update: boolean) {
    this.showOperate = false;
    this.state = FormState.none;
    this.stationId = '';
    if (update) {
      this.pageIndex = 1;
      this._init();
    }
  }

  dialogMsgEvent(status: DialogEnum) {
    this.showConfirm = false;
    if (status == DialogEnum.confirm) {
      this._deleteRows(this.willBeDeleted);
    } else if (status == DialogEnum.cancel) {
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

  private async _deleteRows(rows: GarbageStationManageModel[]) {
    this.table?.deleteRows(rows);
    for (let i = 0; i < rows.length; i++) {
      let id = rows[i].Id;
      await this._business.delete(id);
      this._toastrService.success('删除成功');
    }

    this.pageIndex = 1;
    this._init();
  }

  private async _updateTable() {
    if (this._currentNode && this.enableAddBtn) {
      this._init();
      this.divisionId = this._currentNode.Id;
    } else {
      this.page = {
        PageIndex: this.pageIndex,
        PageSize: this._pageSize,
        RecordCount: 0,
        TotalRecordCount: 0,
        PageCount: 0,
      };
      this.divisionId = '';
      this.dataSubject.next([]);
    }
  }
  private _clickEditBtn(row: GarbageStationManageModel) {
    this.showOperate = true;
    this.state = FormState.edit;
    this.stationId = row.Id;
  }
}

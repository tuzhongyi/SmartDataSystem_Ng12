import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { DivisionTreeSource } from 'src/app/converter/division-tree.converter';

import { EnumHelper } from 'src/app/enum/enum-helper';

import { DivisionTreeComponent } from 'src/app/common/components/division-tree/division-tree.component';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { ConfirmDialogModel } from 'src/app/view-model/confirm-dialog.model';
import { FormState } from 'src/app/enum/form-state.enum';

import { BehaviorSubject } from 'rxjs';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';

import {
  TableColumnModel,
  TableOperateModel,
} from 'src/app/view-model/table.model';
import { CommonTableComponent } from 'src/app/common/components/common-table/common.component';
import { PaginatorComponent } from 'src/app/common/components/paginator/paginator.component';
import { TableSelectStateEnum } from 'src/app/enum/table-select-state.enum';
import { PageEvent } from '@angular/material/paginator';
import { DialogEnum } from 'src/app/enum/dialog.enum';
import { GarbageVehicleManageBusiness } from './business/garbage-vehicle-manage.business';
import { GarbageVehicleManageConf } from './garbage-vehicle-manage.config';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import {
  GarbageVehicleModel,
  IGarbageVehicleManageComponent,
} from './garbage-vehicle-manage.model';
import { Division } from 'src/app/network/model/division.model';
import { DivisionNode } from 'src/app/network/model/division-tree.model';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { GarbageVehicleManageDivisionTreeBusiness } from './business/garbage-vehicle-manage-division-tree.business';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { IModel } from 'src/app/network/model/model.interface';
import {
  IBusiness,
  IDelete,
} from 'src/app/common/interfaces/bussiness.interface';

@Component({
  selector: 'howell-garbage-vehicle-manage',
  templateUrl: './garbage-vehicle-manage.component.html',
  styleUrls: ['./garbage-vehicle-manage.component.less'],
  providers: [
    GarbageVehicleManageDivisionTreeBusiness,
    GarbageVehicleManageBusiness,
  ],
})
export class GarbageVehicleManageComponent
  implements IGarbageVehicleManageComponent, OnInit
{
  private _pageSize = 9;
  private _condition = '';
  private _currentNode?: CommonFlatNode<DivisionTreeSource>;

  //Table
  dataSubject = new BehaviorSubject<GarbageVehicleModel[]>([]);
  selectStrategy = SelectStrategy.Multiple;
  columnModel: TableColumnModel[] = [...GarbageVehicleManageConf]; // 表格列配置详情
  displayedColumns: string[] = this.columnModel.map((model) => model.columnDef); // 表格列 id
  tableOperates: TableOperateModel[] = [];

  selectedRows: GarbageVehicleModel[] = []; //table选中项
  willBeDeleted: GarbageVehicleModel[] = [];

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
    return !!this._currentNode;
  }
  get enableDelBtn() {
    return !!this.selectedRows.length;
  }

  @ViewChild(DivisionTreeComponent) tree?: DivisionTreeComponent;

  constructor(
    public treeBusiness: GarbageVehicleManageDivisionTreeBusiness,
    business: GarbageVehicleManageBusiness,
    private _toastrService: ToastrService
  ) {
    this.business = business;
    this.tableOperates.push(
      new TableOperateModel(
        'edit',
        ['howell-icon-modification'],
        '编辑',
        this._clickEditBtn.bind(this)
      )
    );
  }
  business: IBusiness<
    PagedList<GarbageVehicle>,
    PagedList<GarbageVehicleModel<any>>
  > &
    IDelete<string, GarbageVehicle>;

  async ngOnInit() {
    // let res = await this._business.listStations()
    // console.log(res);
  }

  private async _init() {
    let res = await this.business.load(
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

  selectTableRow(rows: GarbageVehicleModel[]) {
    this.selectedRows = rows;
  }

  async searchEvent(condition: string) {
    this._condition = condition;
    this.pageIndex = 1;
    this._init();
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

  private async _deleteRows(rows: GarbageVehicleModel[]) {
    this.table?.deleteRows(rows);
    for (let i = 0; i < rows.length; i++) {
      let id = rows[i].Id;
      await this.business.delete(id);
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
  private _clickEditBtn(row: GarbageVehicleModel) {
    this.showOperate = true;
    this.state = FormState.edit;
    this.stationId = row.Id;
  }
}

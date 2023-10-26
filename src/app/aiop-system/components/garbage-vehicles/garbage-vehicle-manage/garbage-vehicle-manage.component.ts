import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';

import { BehaviorSubject } from 'rxjs';
import { ConfirmDialogModel } from 'src/app/common/components/confirm-dialog/confirm-dialog.model';
import { DivisionTreeComponent } from 'src/app/common/components/division-tree/division-tree.component';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { Page } from 'src/app/network/model/page_list.model';

import { PageEvent } from '@angular/material/paginator';
import { CommonTableComponent } from 'src/app/common/components/common-table/common.component';
import { PaginatorComponent } from 'src/app/common/components/paginator/paginator.component';
import { DialogEnum } from 'src/app/enum/dialog.enum';
import { TableSelectType } from 'src/app/enum/table-select-type.enum';
import { GarbageVehicle } from 'src/app/network/model/garbage-station/garbage-vehicle.model';
import {
  TableColumnModel,
  TableOperateModel,
} from 'src/app/view-model/table.model';
import { GarbageVehicleManageBusiness } from './garbage-vehicle-manage.business';
import { GarbageVehicleManageConf } from './garbage-vehicle-manage.config';
import {
  GarbageVehicleModel,
  IGarbageVehicleManageBusiness,
  IGarbageVehicleManageComponent,
} from './garbage-vehicle-manage.model';

import { DivisionTreeSource } from 'src/app/common/components/division-tree/division-tree.model';
import {
  FileReadType,
  FileResult,
} from 'src/app/common/components/upload-control/upload-control.model';

@Component({
  selector: 'howell-garbage-vehicle-manage',
  templateUrl: './garbage-vehicle-manage.component.html',
  styleUrls: ['./garbage-vehicle-manage.component.less'],
  providers: [GarbageVehicleManageBusiness],
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
  selected?: GarbageVehicle;

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
  business: IGarbageVehicleManageBusiness;

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

  closeForm() {
    this.showOperate = false;
  }

  dialogMsgEvent(status: DialogEnum) {
    this.showConfirm = false;
    if (status == DialogEnum.confirm) {
      this._deleteRows(this.willBeDeleted);
    } else if (status == DialogEnum.cancel) {
    }
  }
  addBtnClick() {
    this.selected = undefined;
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
    this.selected = row.data;
  }

  onOperateConfirm(data: GarbageVehicle) {
    if (this.selected) {
      this.business.update(data);
    } else {
      this.business.create(data, this.divisionId);
    }
    this.showOperate = false;
  }

  FileReadType = FileReadType;
  onupload(data: FileResult) {
    this.business.upload(data).then((x) => {
      this.pageIndex = 1;
      this._init();
    });
  }
  ondownload() {
    this.business.download();
  }
}

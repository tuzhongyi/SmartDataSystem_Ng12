import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject } from 'rxjs';
import { CommonTableComponent } from 'src/app/common/components/common-table/common.component';
import { PaginatorComponent } from 'src/app/common/components/paginator/paginator.component';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { TableSelectStateEnum } from 'src/app/enum/table-select-state.enum';
import { Page } from 'src/app/network/model/page_list.model';
import { AICameraManageModel, AICameraManageSearchInfo } from 'src/app/view-model/ai-camera-manage.model';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { ConfirmDialogModel } from 'src/app/view-model/confirm-dialog.model';
import { TableColumnModel, TableOperateModel } from 'src/app/view-model/table.model';
import { CameraManageBusiness } from './camera-manage.business';
import { CameraManageConf } from './camera-manage.config'

@Component({
  selector: 'howell-camera-manage',
  templateUrl: './camera-manage.component.html',
  styleUrls: ['./camera-manage.component.less'],
  providers: [
    CameraManageBusiness
  ]
})
export class CameraManageComponent implements OnInit {
  private _pageSize = 3;
  private _condition = '';


  //Table
  dataSubject = new BehaviorSubject<AICameraManageModel[]>([]);
  selectStrategy = SelectStrategy.Multiple;
  columnModel: TableColumnModel[] = [...CameraManageConf]; // 表格列配置详情
  displayedColumns: string[] = this.columnModel.map((model) => model.columnDef); // 表格列 id
  tableOperates: TableOperateModel[] = [];

  selectedRows: AICameraManageModel[] = []; //table选中项
  willBeDeleted: AICameraManageModel[] = [];


  // Paginator
  page: Page | null = null;
  pagerCount: number = 4;
  pageIndex = 1;



  // 对话框
  showOperate = false;
  showConfirm = false;
  dialogModel = new ConfirmDialogModel('确认删除', '删除该项');

  //搜索
  showFilter = false;
  placeHolder = '输入名称';
  disableSearch = false;
  searchInfo: AICameraManageSearchInfo = {
    condition: '',
    CameraName: "",
    CameraType: '',
    DeviceName: '',
    Labels: [],
    filter: false
  }




  // 标签筛选器
  selectedNodes: CommonFlatNode[] = [];
  treeSelectStrategy = SelectStrategy.Multiple;
  defaultIds: string[] = [];
  labelIds: string[] = []


  @ViewChild(CommonTableComponent) table?: CommonTableComponent;
  @ViewChild(PaginatorComponent) paginator?: PaginatorComponent;

  constructor(private _business: CameraManageBusiness) { }

  ngOnInit(): void {
    this._init();
  }
  private async _init() {
    let res = await this._business.init(
      this.searchInfo,
      this.pageIndex,
      this._pageSize
    );
    this.page = res.Page;
    this.dataSubject.next(res.Data);
  }

  search() {
    this.pageIndex = 1;
    this._init();
  }
  toggleFilter() {
    this.disableSearch = this.showFilter = !this.showFilter;
    this.searchInfo.filter = this.showFilter

  }

  selectTableRow(rows: AICameraManageModel[]) {
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


  // 点击树节点
  selectTreeNode(nodes: CommonFlatNode[]) {
    // console.log('外部结果', nodes)
    this.selectedNodes = nodes;
    this.labelIds = this.selectedNodes.map(n => n.Id)

  }

}

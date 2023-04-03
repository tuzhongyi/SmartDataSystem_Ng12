import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { CommonTableComponent } from 'src/app/common/components/common-table/common.component';
import { PaginatorComponent } from 'src/app/common/components/paginator/paginator.component';
import { RegionTreeComponent } from 'src/app/common/components/region-tree/region-tree.component';
import { RegionTreeSource } from 'src/app/converter/region-tree.converter';
import { DialogEnum } from 'src/app/enum/dialog.enum';
import { FormState } from 'src/app/enum/form-state.enum';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { TableSelectType } from 'src/app/enum/table-select-type.enum';
import { EncodeDevice } from 'src/app/network/model/encode-device';
import { Page } from 'src/app/network/model/page_list.model';
import {
  AICameraManageModel,
  AICameraManageSearchInfo,
} from 'src/app/view-model/ai-camera-manage.model';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { CommonNestNode } from 'src/app/view-model/common-nest-node.model';
import { ConfirmDialogModel } from 'src/app/common/components/confirm-dialog/confirm-dialog.model';
import {
  TableCellEvent,
  TableColumnModel,
  TableOperateModel,
} from 'src/app/view-model/table.model';
import { CameraManageBusiness } from './camera-manage.business';
import { CameraManageConf } from './camera-manage.config';

@Component({
  selector: 'howell-camera-manage',
  templateUrl: './camera-manage.component.html',
  styleUrls: ['./camera-manage.component.less'],
  providers: [CameraManageBusiness],
})
export class CameraManageComponent implements OnInit, AfterViewInit {
  private _pageSize = 9;
  private _currentNode?: CommonFlatNode<RegionTreeSource>;

  FormState = FormState;

  //Table
  dataSubject = new BehaviorSubject<AICameraManageModel[]>([]);
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

  // 表单
  state = FormState.none;
  operateId = '';

  resourceName = '';
  regionId = '';

  //搜索
  showFilter = false;
  placeHolder = '输入名称';
  disableSearch = false;
  searchInfo: AICameraManageSearchInfo = {
    Condition: '',
    CameraName: '',
    CameraType: '',
    DeviceId: '',
    LabelIds: [],
    Filter: false,
  };

  // 标签筛选器
  selectedNodes: CommonFlatNode[] = [];
  treeSelectStrategy = SelectStrategy.Multiple;
  defaultIds: string[] = [];
  labelIds: string[] = [];

  // 编码设备筛选器
  encodeDevices: EncodeDevice[] = [];

  // 绑定标签
  showBind = false;

  // 移动摄像机
  showMove = false;
  resourceIds: string[] = [];

  get enableAddBtn() {
    return this._currentNode && this._currentNode.Expandable == false;
  }
  get enableDelBtn() {
    return !!this.selectedRows.length;
  }
  get enableBindBtn() {
    return !!this.selectedRows.length;
  }
  get enableMoveBtn() {
    return !!this.selectedRows.length;
  }

  @ViewChild(CommonTableComponent) table?: CommonTableComponent;
  @ViewChild(PaginatorComponent) paginator?: PaginatorComponent;
  @ViewChild(RegionTreeComponent) regionTree?: RegionTreeComponent;

  constructor(
    private _business: CameraManageBusiness,
    private _toastrService: ToastrService,
    private changeDetector: ChangeDetectorRef
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
    this.encodeDevices = (await this._business.listEncodeDevice()).Data;
  }
  ngAfterViewInit(): void {
    if (this.regionTree) {
      let extra = new CommonNestNode();
      extra.Id = String(null);
      extra.Name = '未分配摄像机';
      extra.HasChildren = false;
      extra.ParentId = undefined;
      extra.ChildrenLoaded = true;
      extra.ParentNode = undefined;
      extra.IconClass = 'howell-icon-video';
      this.regionTree.addNode(extra);
    }
  }
  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }
  private async _init() {
    // console.log('searchInfo', this.searchInfo)
    let res = await this._business.init(
      this.regionId,
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
    this.searchInfo.Filter = this.showFilter;
  }

  selectTableRow(rows: AICameraManageModel[]) {
    this.selectedRows = rows;
  }
  selectTableCell(e: TableCellEvent<AICameraManageModel>) {
    console.log(e);
    if (e.column.columnDef == 'Labels') {
      this.operateId = e.row.Id;
      this.showBind = true;
      this.resourceName = e.row.Name;
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

  async dialogMsgEvent(status: DialogEnum) {
    this.showConfirm = false;
    if (status == DialogEnum.confirm) {
      this._deleteRows(this.willBeDeleted);
    } else if (status == DialogEnum.cancel) {
    }
  }

  selectRegionTreeNode(nodes: CommonFlatNode[]) {
    this._currentNode = nodes[0];
    console.log('外部结果', nodes);
    this.state = FormState.none;
    this._updateTable();
  }
  // 点击树节点
  selectLabelTreeNode(nodes: CommonFlatNode[]) {
    // console.log('外部结果', nodes)
    this.selectedNodes = nodes;
    this.searchInfo.LabelIds = this.selectedNodes.map((n) => n.Id);
  }
  deleteBtnClick() {
    this.willBeDeleted = [...this.selectedRows];
    this.showConfirm = true;
    this.dialogModel.content = `删除${this.willBeDeleted.length}个选项?`;
  }
  addBtnClick() {
    this.state = FormState.add;
    this.showOperate = true;
  }

  bindBtnClick() {
    this.showBind = true;
    this.operateId = this.selectedRows[0]?.Id || '';
    this.resourceName = this.selectedRows[0]?.Name || '';
  }
  moveBtnClick() {
    this.showMove = true;
    this.resourceIds = this.selectedRows.map((row) => row.Id);
  }
  closeForm(update: boolean) {
    this.showOperate = false;
    this.state = FormState.none;
    this.operateId = '';
    if (update) {
      this.pageIndex = 1;
      this._init();
    }
  }
  closeBind(update: boolean) {
    this.showBind = false;
    this.operateId = '';
    if (update) {
      this.pageIndex = 1;
      this._init();
    }
  }
  closeMove(update: boolean) {
    this.showMove = false;
    this.resourceIds = [];
    if (update) {
      this.pageIndex = 1;
      this._init();
    }
  }

  private async _updateTable() {
    if (this._currentNode) {
      this.regionId = this._currentNode.Id;
      this._init();
      // if (this._currentNode.Expandable == false) {
      //   this._init();
      // } else {
      //   this.page = {
      //     PageIndex: this.pageIndex,
      //     PageSize: this._pageSize,
      //     RecordCount: 0,
      //     TotalRecordCount: 0,
      //     PageCount: 0
      //   }
      //   this.dataSubject.next([])
      // }
    } else {
      this.page = {
        PageIndex: this.pageIndex,
        PageSize: this._pageSize,
        RecordCount: 0,
        TotalRecordCount: 0,
        PageCount: 0,
      };
      this.regionId = '';
      this.dataSubject.next([]);
    }
  }

  private async _deleteRows(rows: AICameraManageModel[]) {
    this.table?.deleteRows(rows);
    for (let i = 0; i < rows.length; i++) {
      let id = rows[i].Id;
      let res = await this._business.deleteAICamera(id);
      if (res) this._toastrService.success('删除成功');
    }
    this.pageIndex = 1;
    this._init();
  }

  private _clickEditBtn(row: AICameraManageModel) {
    this.showOperate = true;
    this.state = FormState.edit;
    this.operateId = row.Id;
  }
}

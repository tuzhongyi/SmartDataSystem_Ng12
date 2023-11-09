import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import {
  AICameraModelManageEventArgs,
  AICameraModelManageSearchInfo,
  AICameraModelOperateType,
  CameraAIModelManageModel,
  CameraManageModel,
} from 'src/app/aiop-system/components/camera-model-manage/camera-model-manage.model';
import { AICameraModelTableComponent } from 'src/app/common/components/ai-camera-model-table/ai-camera-model-table.component';
import { CommonTree } from 'src/app/common/components/common-tree/common-tree';
import { AiIconConfig } from 'src/app/common/models/ai-icon.config';
import { CameraDeviceType } from 'src/app/enum/device-type.enum';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { TableSelectType } from 'src/app/enum/table-select-type.enum';
import { CameraAIModel } from 'src/app/network/model/garbage-station/camera-ai.model';
import { Page } from 'src/app/network/model/page_list.model';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import Conf from 'src/assets/json/ai-icon.json';
import { AIModelManageConverter } from '../ai-model-manage/ai-model-manage.converter';
import { AICameraModelManageBusiness } from './camera-model-manage.business';
import { AICameraModelManageConverter } from './camera-model-manage.converter';
import { CameraModelManageWindow } from './camera-model-manage.window';

@Component({
  selector: 'howell-camera-model-manage',
  templateUrl: './camera-model-manage.component.html',
  styleUrls: [
    '../../../../assets/less/confirm.less',
    './camera-model-manage.component.less',
  ],
  providers: [
    AICameraModelManageBusiness,
    AICameraModelManageConverter,
    AIModelManageConverter,
  ],
})
export class CameraModelManageComponent implements OnInit {
  constructor(
    private _business: AICameraModelManageBusiness,
    private _toastrService: ToastrService
  ) {}
  selectDataSource = new Map<CameraDeviceType, string>([
    [CameraDeviceType.G3, CameraDeviceType.G3],
    [CameraDeviceType.G5, CameraDeviceType.G5],
  ]);

  searchInfo: AICameraModelManageSearchInfo = {
    ModelName: '',
    CameraDeviceType: '',
    PageIndex: 1,
    PageSize: 4,
    CameraName: '',
    LabelIds: [],
  };

  page: Page = {
    PageIndex: 0,
    PageSize: 0,
    RecordCount: 0,
    TotalRecordCount: 0,
    PageCount: 0,
  };

  // 模型列表
  AIModels: CameraAIModelManageModel<CameraAIModel>[] = [];
  imgBase = 'assets/img/ai-model';
  icons: AiIconConfig = Conf;

  // Table
  dataSubject = new BehaviorSubject<CameraManageModel[]>([]);

  loadtable: EventEmitter<TableSelectType> = new EventEmitter();

  selectStrategy = SelectStrategy.Multiple;
  private _selectType = TableSelectType.Cancel;
  public get selectType(): TableSelectType {
    return this._selectType;
  }
  public set selectType(v: TableSelectType) {
    this._selectType = v;
    this.loadtable.emit(v);
  }

  selectedRows: CameraManageModel[] = []; //table选中项
  // willBeDeleted: AIModelManageModel[] = [];

  disablehover = false;

  // 标签筛选器
  selectedNodes: CommonFlatNode[] = [];
  treeSelectStrategy = SelectStrategy.Multiple;
  defaultIds: string[] = [];
  labelIds: string[] = [];

  @ViewChild(AICameraModelTableComponent) table?: AICameraModelTableComponent;
  @ViewChild('tree') tree?: CommonTree;

  window = new CameraModelManageWindow();

  ngOnInit(): void {
    this.init();
  }

  private init() {
    this.loadAIModels();
    this.loadCameraAIModels();
  }
  // 拉取模型列表
  private async loadAIModels() {
    this.AIModels = await this._business.listAIModels(this.searchInfo);
    // console.log('模型列表', this.AIModels);
  }
  private async loadCameraAIModels() {
    let { Data, Page } = await this._business.listCameraAIModels(
      this.searchInfo
    );
    this.page = Page;
    this.dataSubject.next(Data);
    // console.log('摄像机模型列表', Data);
  }

  // 模型列表搜索
  searchAIModels(condition: string) {
    this.searchInfo.ModelName = condition;
    this.loadAIModels();
  }
  // AI设备列表搜索
  searchCameraAIModels() {
    this.searchInfo.PageIndex = 1;
    this.loadCameraAIModels();
  }

  dragstart(e: DragEvent, model: CameraAIModelManageModel<CameraAIModel>) {
    // console.log('drag start');
    let rawData = model.RawData;
    if (e.dataTransfer && rawData) {
      this.disablehover = true;
      e.dataTransfer.setData('text/plain', JSON.stringify(rawData));
    }
  }
  dragend(e: DragEvent) {
    console.log('drag end');
    this.disablehover = false;
  }

  async onoperate(e: AICameraModelManageEventArgs) {
    this.window.confirm.args = e;
    if (e.type == AICameraModelOperateType.delete) {
      this.window.confirm.show = true;
    } else if ((e.type = AICameraModelOperateType.add)) {
      this._addAIModelToCamera();
    }
  }
  async dialogMsgEvent() {
    this.window.confirm.show = false;
    this._deleteAIModelFromCamera();
  }

  /***************************组件通用代码**********************************/

  selectTableRow(rows: CameraManageModel[]) {
    this.selectedRows = rows;
    // console.log('选中', rows);
  }
  pageEvent(pageInfo: PageEvent) {
    if (this.searchInfo.PageIndex == pageInfo.pageIndex + 1) return;
    this.searchInfo.PageIndex = pageInfo.pageIndex + 1;
    this.selectType = TableSelectType.Cancel;
    this.loadCameraAIModels();
  }

  /**
   *  手动调用方法或者修改属性值
   * @param type
   */
  tableSelect(type: TableSelectType) {
    this.table?.changeSelectType(type);
    // this.selectType = type;
  }
  changeCameraDeviceType() {
    this.init();
  }

  // 点击树节点
  selectTreeNode(nodes: CommonFlatNode[]) {
    // console.log('外部结果', nodes)
    this.selectedNodes = nodes;
    this.searchInfo.LabelIds = this.selectedNodes.map((n) => n.Id);
  }

  private async _deleteAIModelFromCamera() {
    if (this.window.confirm.args) {
      let data = this.window.confirm.args.data;
      for (let i = 0; i < data.length; i++) {
        let cameraId = data[i].camera.Id;
        let modelId = data[i].model.Id;
        let res = await this._business.deleteAIModelFromCamera(
          cameraId,
          modelId
        );
        if (res) {
          this._toastrService.success('删除成功');
        }
      }
      this.loadCameraAIModels();
    }
  }

  private async _addAIModelToCamera() {
    if (this.window.confirm.args) {
      let data = this.window.confirm.args.data;
      for (let i = 0; i < data.length; i++) {
        let cameraId = data[i].camera.Id;
        let modelId = data[i].model.Id;
        let res = await this._business.addAIModelToCamera(cameraId, modelId);
        if (res) {
          this._toastrService.success('添加成功');
        }
      }
      this.loadCameraAIModels();
    }
  }
}

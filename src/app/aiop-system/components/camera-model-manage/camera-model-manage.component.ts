import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CameraAIModel } from 'src/app/network/model/camera-ai.model';
import { AICameraModelManageBusiness } from './camera-model-manage.business';
import Conf from 'src/assets/json/ai-icon.json';
import { Page } from 'src/app/network/model/page_list.model';
import { BehaviorSubject } from 'rxjs';
import {
  CameraManageModel,
  AICameraModelManageEvent,
  AICameraModelManageSearchInfo,
  AICameraModelOperateType,
  CameraAIModelManageModel,
} from 'src/app/aiop-system/components/camera-model-manage/camera-model-manage.model';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { PageEvent } from '@angular/material/paginator';
import { ConfirmDialogModel } from 'src/app/common/components/confirm-dialog/confirm-dialog.model';
import { DialogEnum } from 'src/app/enum/dialog.enum';
import { AICameraModelTableComponent } from 'src/app/common/components/ai-camera-model-table/ai-camera-model-table.component';
import { TableSelectType } from 'src/app/enum/table-select-type.enum';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { CommonTree } from 'src/app/common/components/common-tree/common-tree';
import { AICameraModelManageConverter } from './camera-model-manage.converter';
import { AIModelManageConverter } from '../ai-model-manage/ai-model-manage.converter';
import { CameraDeviceType } from 'src/app/enum/device-type.enum';
import { AiIconConfig } from 'src/app/common/models/ai-icon.config';

@Component({
  selector: 'howell-camera-model-manage',
  templateUrl: './camera-model-manage.component.html',
  styleUrls: ['./camera-model-manage.component.less'],
  providers: [
    AICameraModelManageBusiness,
    AICameraModelManageConverter,
    AIModelManageConverter,
  ],
})
export class CameraModelManageComponent implements OnInit {
  selectDataSource = new Map<CameraDeviceType, string>([
    [CameraDeviceType.G3, CameraDeviceType.G3],
    [CameraDeviceType.G5, CameraDeviceType.G5],
  ]);

  searchInfo: AICameraModelManageSearchInfo = {
    ModelName: '',
    CameraDeviceType: '',
    PageIndex: 1,
    PageSize: 9,
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
  selectStrategy = SelectStrategy.Multiple;
  selectType = TableSelectType.Cancel;
  selectedRows: CameraManageModel[] = []; //table选中项
  // willBeDeleted: AIModelManageModel[] = [];

  disablehover = false;
  showConfirm = false;
  dialogModel = new ConfirmDialogModel('确认删除', '删除该项');
  aiCameraManageEvent?: AICameraModelManageEvent;

  // 标签筛选器
  selectedNodes: CommonFlatNode[] = [];
  treeSelectStrategy = SelectStrategy.Multiple;
  defaultIds: string[] = [];
  labelIds: string[] = [];

  @ViewChild(AICameraModelTableComponent) table?: AICameraModelTableComponent;
  @ViewChild('tree') tree?: CommonTree;

  constructor(
    private _business: AICameraModelManageBusiness,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this._init();
  }

  private _init() {
    this._listAIModels();
    this._listCameraAIModels();
  }
  // 拉取模型列表
  private async _listAIModels() {
    this.AIModels = await this._business.listAIModels(this.searchInfo);
    // console.log('模型列表', this.AIModels);
  }
  private async _listCameraAIModels() {
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
    this._listAIModels();
  }
  // AI设备列表搜索
  searchCameraAIModels() {
    this.searchInfo.PageIndex = 1;
    this._listCameraAIModels();
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

  async operateTableRow(e: AICameraModelManageEvent) {
    this.aiCameraManageEvent = e;
    if (e.type == AICameraModelOperateType.delete) {
      this.showConfirm = true;
    } else if ((e.type = AICameraModelOperateType.add)) {
      this._addAIModelToCamera();
    }
  }
  async dialogMsgEvent(status: DialogEnum) {
    this.showConfirm = false;
    if (status == DialogEnum.confirm) {
      this._deleteAIModelFromCamera();
    } else if (status == DialogEnum.cancel) {
    }
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
    this._listCameraAIModels();
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
    this._init();
  }

  // 点击树节点
  selectTreeNode(nodes: CommonFlatNode[]) {
    // console.log('外部结果', nodes)
    this.selectedNodes = nodes;
    this.searchInfo.LabelIds = this.selectedNodes.map((n) => n.Id);
  }

  private async _deleteAIModelFromCamera() {
    if (this.aiCameraManageEvent) {
      let data = this.aiCameraManageEvent.data;
      for (let i = 0; i < data.length; i++) {
        let cameraId = data[i].CameraId;
        let modelId = data[i].ModelId;
        let res = await this._business.deleteAIModelFromCamera(
          cameraId,
          modelId
        );
        if (res) {
          this._toastrService.success('删除成功');
        }
      }
      this.searchInfo.PageIndex = 1;
      this._listCameraAIModels();
    }
  }

  private async _addAIModelToCamera() {
    if (this.aiCameraManageEvent) {
      let data = this.aiCameraManageEvent.data;
      for (let i = 0; i < data.length; i++) {
        let cameraId = data[i].CameraId;
        let modelId = data[i].ModelId;
        let res = await this._business.addAIModelToCamera(cameraId, modelId);
        if (res) {
          this._toastrService.success('添加成功');
        }
      }
      this.searchInfo.PageIndex = 1;
      this._listCameraAIModels();
    }
  }
}

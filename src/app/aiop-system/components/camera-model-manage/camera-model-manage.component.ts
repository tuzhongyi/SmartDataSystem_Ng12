import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CameraAIModel } from 'src/app/network/model/camera-ai.model';
import { AICameraModelManageBusiness } from './camera-model-manage.business';
import Conf from 'src/assets/json/ai-icon.json';
import { Page } from 'src/app/network/model/page_list.model';
import { BehaviorSubject } from 'rxjs';
import {
  AICameraModelManageEvent,
  AICameraModelManageModel,
  AICameraModelManageSearchInfo,
  AICameraModelOperateType,
} from 'src/app/aiop-system/components/camera-model-manage/camera-model-manage.model';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { PageEvent } from '@angular/material/paginator';
import { ConfirmDialogModel } from 'src/app/view-model/confirm-dialog.model';
import { DialogEnum } from 'src/app/enum/dialog.enum';
import { AICameraModelTableComponent } from 'src/app/common/components/ai-camera-model-table/ai-camera-model-table.component';
import { TableSelectStateEnum } from 'src/app/enum/table-select-state.enum';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { CommonTree } from 'src/app/common/components/common-tree/common-tree';
import { Language } from 'src/app/common/tools/language';
import { AICameraModelManageConverter } from './camera-model-manage.converter';
import { AIModelManageConverter } from '../ai-model-manage/ai-model-manage.converter';
import { CameraDeviceType } from 'src/app/enum/device-type.enum';

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
  AIModels: CameraAIModel[] = [];
  imgBase = 'assets/img/ai-model';
  icons: any = Conf;
  cameraModelCondition = '';

  // Table
  dataSubject = new BehaviorSubject<AICameraModelManageModel[]>([]);
  selectStrategy = SelectStrategy.Multiple;
  selectedRows: AICameraModelManageModel[] = []; //table选中项
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

  selectTableRow(rows: AICameraModelManageModel[]) {
    this.selectedRows = rows;
    console.log('选中', rows);
  }
  pageEvent(pageInfo: PageEvent) {
    if (this.searchInfo.PageIndex == pageInfo.pageIndex + 1) return;
    this.searchInfo.PageIndex = pageInfo.pageIndex + 1;
    this._listCameraAIModels();
  }

  dragstart(e: DragEvent, model: CameraAIModel) {
    console.log('drag start');
    if (e.dataTransfer) {
      this.disablehover = true;
      e.dataTransfer.setData('text/plain', JSON.stringify(model));
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
  changeCameraDeviceType() {
    this._init();
  }

  // 点击树节点
  selectTreeNode(nodes: CommonFlatNode[]) {
    // console.log('外部结果', nodes)
    this.selectedNodes = nodes;
    this.labelIds = this.selectedNodes.map((n) => n.Id);
  }

  // 拉取模型列表
  private async _listAIModels() {
    let { Data } = await this._business.listAIModels(this.searchInfo);
    this.AIModels = Data;
    console.log('模型列表', this.AIModels);
  }
  private async _listCameraAIModels() {
    let { Data, Page } = await this._business.listCameraAIModels(
      this.searchInfo
    );
    this.page = Page;
    this.dataSubject.next(Data);
    console.log('摄像机模型列表', Data);
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

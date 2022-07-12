import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CameraAIModel } from 'src/app/network/model/camera-ai.model';
import { AICameraModelManageBusiness } from './camera-model-manage.business';
import Conf from "src/assets/json/ai-icon.json"
import { Page } from 'src/app/network/model/page_list.model';
import { BehaviorSubject } from 'rxjs';
import { AICameraModelManageEvent, AICameraModelManageModel, AICameraModelOperateType } from 'src/app/view-model/ai-camera-model-manage.model';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { PageEvent } from '@angular/material/paginator';
import { ConfirmDialogModel } from 'src/app/view-model/confirm-dialog.model';
import { ConfirmDialogEnum } from 'src/app/enum/confim-dialog.enum';
import { AICameraModelTableComponent } from 'src/app/common/components/ai-camera-model-table/ai-camera-model-table.component';
import { TableSelectStateEnum } from 'src/app/enum/table-select-state.enum';

@Component({
  selector: 'howell-camera-model-manage',
  templateUrl: './camera-model-manage.component.html',
  styleUrls: ['./camera-model-manage.component.less'],
  providers: [
    AICameraModelManageBusiness
  ]
})
export class CameraModelManageComponent implements OnInit {

  private _pageSize = 9;
  private _Modelcondition = '';

  // 模型列表
  AIModels: CameraAIModel[] = [];
  imgBase = 'assets/img/ai-model';
  icons: any = Conf;
  cameraModelCondition = ''

  // Table
  dataSubject = new BehaviorSubject<AICameraModelManageModel[]>([]);
  selectStrategy = SelectStrategy.Multiple;
  selectedRows: AICameraModelManageModel[] = []; //table选中项
  // willBeDeleted: AIModelManageModel[] = [];


  // Paginator
  page: Page | null = null;
  pagerCount: number = 4;
  pageIndex = 1;


  disablehover = false;
  showConfirm = false;
  dialogModel = new ConfirmDialogModel('确认删除', '删除该项');
  aiCameraManageEvent?: AICameraModelManageEvent;


  @ViewChild(AICameraModelTableComponent) table?: AICameraModelTableComponent;

  constructor(private _business: AICameraModelManageBusiness, private _toastrService: ToastrService) { }

  ngOnInit(): void {
    this._init()
  }

  private async _init() {
    this._listAIModels();

    this._listCameraAIModels();

  }

  // 模型列表搜索
  searchAIModels(condition: string) {
    this._Modelcondition = condition;
    this._listAIModels();
  }
  // AI设备列表搜索
  searchCameraAIModels() {
    this.pageIndex = 1;
    this._listCameraAIModels()
  }

  selectTableRow(rows: AICameraModelManageModel[]) {
    this.selectedRows = rows;
    console.log("选中", rows)
  }
  pageEvent(pageInfo: PageEvent) {
    if (this.pageIndex == pageInfo.pageIndex + 1) return;
    this.pageIndex = pageInfo.pageIndex + 1;
    this._listCameraAIModels();
  }

  dragstart(e: DragEvent, model: CameraAIModel) {
    console.log('drag start');
    if (e.dataTransfer) {
      this.disablehover = true;
      e.dataTransfer.setData('text/plain', JSON.stringify(model))
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
    } else if (e.type = AICameraModelOperateType.add) {
      this._addAIModelToCamera();
    }
  }
  async dialogMsgEvent(status: ConfirmDialogEnum) {
    this.showConfirm = false;
    if (status == ConfirmDialogEnum.confirm) {
      this._deleteAIModelFromCamera()

    } else if (status == ConfirmDialogEnum.cancel) {

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


  private async _listAIModels() {
    let AIModelsRes = await this._business.listAIModels(this._Modelcondition);
    this.AIModels = AIModelsRes.Data;
    // console.log('模型列表', this.AIModels)
  }
  private async _listCameraAIModels() {

    let res = await this._business.listCameraAIModels(
      this.cameraModelCondition,
      this.pageIndex,
      this._pageSize
    );
    this.page = res.Page;
    this.dataSubject.next(res.Data);
  }
  private _listLabels() {

    // let labels = await this._business.listLabels();
    // console.log(labels)
  }
  private async _deleteAIModelFromCamera() {
    if (this.aiCameraManageEvent) {
      let data = this.aiCameraManageEvent.data;
      for (let i = 0; i < data.length; i++) {
        let cameraId = data[i].CameraId;
        let modelId = data[i].ModelId;
        let res = await this._business.deleteAIModelFromCamera(cameraId, modelId)
        if (res) {
          this._toastrService.success('删除成功');
        }
      }
      this.pageIndex = 1;
      this._listCameraAIModels()
    }
  }

  private async _addAIModelToCamera() {
    if (this.aiCameraManageEvent) {
      let data = this.aiCameraManageEvent.data;
      for (let i = 0; i < data.length; i++) {
        let cameraId = data[i].CameraId;
        let modelId = data[i].ModelId;
        let res = await this._business.addAIModelToCamera(cameraId, modelId)
        if (res) {
          this._toastrService.success('添加成功');
        }
      }
      this.pageIndex = 1;
      this._listCameraAIModels()
    }

  }



}

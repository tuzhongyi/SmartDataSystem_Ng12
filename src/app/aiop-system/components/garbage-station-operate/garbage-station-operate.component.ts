import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormState } from 'src/app/enum/form-state.enum';
import {
  GarbageStation,
  GarbageStationType,
} from 'src/app/network/model/garbage-station.model';
import { GarbageStationOperateBusiness } from './business/garbage-station-operate.business';
import { AiopCameraConf, StationCameraConf } from './garbage-station.config';
import { AICameraManageModel } from 'src/app/view-model/ai-camera-manage.model';
import { BehaviorSubject } from 'rxjs';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { TableColumnModel } from 'src/app/view-model/table.model';
import { TableSelectType } from 'src/app/enum/table-select-type.enum';
import { CommonTableComponent } from 'src/app/common/components/common-table/common.component';
import { Camera } from 'src/app/network/model/camera.model';
import { ConfirmDialogModel } from 'src/app/common/components/confirm-dialog/confirm-dialog.model';
import { DialogEnum } from 'src/app/enum/dialog.enum';
import { StationType } from 'src/app/enum/station-type.enum';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { Language } from 'src/app/common/tools/language';
import { GarbageStationOperateAICameraBusiness } from './business/garbage-station-operate-ai-camera.business';
import { GarbageStationOperateStationCameraBusiness } from './business/garbage-station-operate-station-camera.business';
import { GarbageStationOperateCameraBusiness } from './business/garbage-station-operate-camera.business';
import { GarbageStationOperateStationTypeBusiness } from './business/garbage-station-operate-station-type.business';
import {
  IGarbageStationOperateBusiness,
  IGarbageStationOperateComponent,
} from './garbage-station-operate.model';
import { Flags } from 'src/app/common/tools/flags';

@Component({
  selector: 'howell-garbage-station-operate',
  templateUrl: './garbage-station-operate.component.html',
  styleUrls: ['./garbage-station-operate.component.less'],
  providers: [
    GarbageStationOperateBusiness,
    GarbageStationOperateStationTypeBusiness,
    GarbageStationOperateCameraBusiness,
    GarbageStationOperateAICameraBusiness,
    GarbageStationOperateStationCameraBusiness,
  ],
})
export class GarbageStationOperateComponent
  implements IGarbageStationOperateComponent, OnInit
{
  @Input()
  business: IGarbageStationOperateBusiness;

  private _garbageStation?: GarbageStation;
  private _aiopDataSource: AICameraManageModel[] = [];

  condition = '';

  FormState = FormState;

  //Table
  // 因为有编码设备信息，所以不能直接使用 AIOPCamera
  aiopDataSubject = new BehaviorSubject<AICameraManageModel[]>([]);
  selectStrategy = SelectStrategy.Multiple;
  aiopColumnModel: TableColumnModel[] = [...AiopCameraConf]; // 表格列配置详情
  aiopDisplayedColumns: string[] = this.aiopColumnModel.map(
    (model) => model.columnDef
  );
  aiopSelectedRows: AICameraManageModel[] = [];

  stationDataSubject = new BehaviorSubject<Camera[]>([]);
  stationColumnModel: TableColumnModel[] = [...StationCameraConf]; // 表格列配置详情
  stationDisplayedColumns: string[] = this.stationColumnModel.map(
    (model) => model.columnDef
  );
  stationSelectedRows: Camera[] = [];
  willBeDeleted: Camera[] = [];

  stationTypes: GarbageStationType[] = [];
  stationType: StationType = 0;
  stationName: string = '';
  showConfirm = false;
  dialogModel = new ConfirmDialogModel('确认删除', '删除该项');

  showPageTwo = false;

  myForm = this._fb.group({
    Name: '',
    StationType: '',
  });

  get title() {
    if (this.state == FormState.add) {
      return '添加垃圾厢房';
    } else if (this.state == FormState.edit) {
      return '编辑垃圾厢房';
    }
    return '';
  }

  get enableDelBtn() {
    return !!this.stationSelectedRows.length;
  }

  @ViewChild('addTable') addTable?: CommonTableComponent;
  @ViewChild('editTable') editTable?: CommonTableComponent;

  @Input()
  state: FormState = FormState.none;

  @Input()
  stationId: string = '';

  @Input()
  divisionId: string = '';

  @Output()
  closeEvent = new EventEmitter<boolean>();

  constructor(
    business: GarbageStationOperateBusiness,
    private _fb: FormBuilder,
    private _toastrService: ToastrService
  ) {
    this.business = business;
  }

  async ngOnInit() {
    let res = await this.business.type.load();
    this.stationTypes = res;

    this.initStationType();
    this._init();
  }

  private async _init() {
    if (this.state == FormState.add || this.showPageTwo) {
      let res = await this.business.camera.load(this.condition);
      this._aiopDataSource = res;
    } else if (this.state == FormState.edit) {
      this._garbageStation = await this.business.load(this.stationId);
      console.log(this._garbageStation);
      this.stationType = this._garbageStation!.StationType;
    }
    this._updateForm();
  }

  initStationType() {
    // this.stationTypes.push(
    //   SelectItem.create(StationType.Garbage, Language.StationType)
    // );
    // this.stationTypes.push(
    //   SelectItem.create(StationType.Construction, Language.StationType)
    // );
    // this.stationType = this.stationTypes[0].value;
  }

  selectAiopTableRow(rows: AICameraManageModel[]) {
    this.aiopSelectedRows = rows;
  }
  selectstationTableRow(rows: Camera[]) {
    this.stationSelectedRows = rows;
  }

  search() {
    this._init();
  }
  aiopTableSelect(type: TableSelectType) {
    if (this.addTable) {
      switch (type) {
        case TableSelectType.All:
          this.addTable.selectAll();
          break;
        case TableSelectType.Reverse:
          this.addTable.selectReverse();
          break;
        case TableSelectType.Cancel:
          this.addTable.selectCancel();
          break;
        default:
          throw new TypeError('类型错误');
      }
    }
  }
  stationTableSelect(type: TableSelectType) {
    if (this.editTable) {
      switch (type) {
        case TableSelectType.All:
          this.editTable.selectAll();
          break;
        case TableSelectType.Reverse:
          this.editTable.selectReverse();
          break;
        case TableSelectType.Cancel:
          this.editTable.selectCancel();
          break;
        default:
          throw new TypeError('类型错误');
      }
    }
  }

  addBtnClick() {
    this.showPageTwo = true;
    this.condition = '';
    this._init();
  }
  deleteBtnClick() {
    this.willBeDeleted = [...this.stationSelectedRows];
    this.showConfirm = true;
    this.dialogModel.content = `删除${this.willBeDeleted.length}个选项?`;
  }

  dialogMsgEvent(status: DialogEnum) {
    this.showConfirm = false;
    if (status == DialogEnum.confirm) {
      this._deleteRows(this.willBeDeleted);
    } else if (status == DialogEnum.cancel) {
    }
  }
  async onSubmit() {
    if (this._checkForm()) {
      if (this.state == FormState.add) {
        let station = new GarbageStation();
        station.Id = '';
        station.DivisionId = this.divisionId;
        station.Name = this.stationName;
        station.StationType = this.stationType;
        station.MaxDryVolume = 0;
        station.MaxWetVolume = 0;
        station.StationState = new Flags(0);
        station.UpdateTime = new Date();
        station.CreateTime = new Date();
        let res = await this.business.create(station);

        if (res) {
          console.log(res);
          this.aiopSelectedRows.map((row) => {
            let camera = new Camera();
            camera.Id = row.Id;
            camera.CreateTime = new Date();
            camera.UpdateTime = new Date();
            camera.Name = row.Name;
            camera.GarbageStationId = res.Id;

            return this.business.camera.station.create(camera);
          });

          this._toastrService.success('操作成功');
          this.closeEvent.emit(true);
        }
      } else if (this.state == FormState.edit) {
        if (this._garbageStation) {
          this._garbageStation.Name = this.stationName;
          this._garbageStation.StationType = this.stationType;
          this._garbageStation.UpdateTime = new Date();

          let res = await this.business.update(this._garbageStation);
          if (res) {
            this._toastrService.success('操作成功');
            this.closeEvent.emit(true);
          }
        }
      }
    }
  }
  onReset() {
    this.closeEvent.emit(false);
  }

  async onConfirm() {
    if (this._garbageStation) {
      let len = this.aiopSelectedRows.length;
      if (len) {
        for (let i = 0; i < len; i++) {
          let row = this.aiopSelectedRows[i];
          let camera = new Camera();
          camera.Id = row.Id;
          camera.CreateTime = new Date();
          camera.UpdateTime = new Date();
          camera.Name = row.Name;
          camera.GarbageStationId = this._garbageStation.Id;

          await this.business.camera.station.create(camera);
        }
        this._toastrService.success('操作成功');
        this.onCancel();
        this._init();
        return;
      }
    }
    this.onCancel();
  }
  onCancel() {
    this.showPageTwo = false;
    this.condition = '';
    this._aiopDataSource = [];
    this.aiopDataSubject.next(this._aiopDataSource);
  }

  private _checkForm() {
    if (this.stationName == '') {
      return this._toastrService.warning('请输入厢房名称');
    }
    return true;
  }
  private async _deleteRows(rows: Camera[]) {
    this.addTable?.deleteRows(rows);
    for (let i = 0; i < rows.length; i++) {
      let id = rows[i].Id;
      await this.business.camera.station.delete(this.stationId, id);
      this._toastrService.success('删除成功');
    }
    this._init();
  }
  private _updateForm() {
    if (this.state == FormState.add || this.showPageTwo) {
      this.aiopDataSubject.next(this._aiopDataSource);
    } else if (this.state == FormState.edit) {
      if (this._garbageStation) {
        this.stationName = this._garbageStation.Name;
        this.stationType = this._garbageStation.StationType;

        let cameras = this._garbageStation.Cameras ?? [];
        let filtered = cameras.filter((camera) =>
          camera.Name.includes(this.condition)
        );
        this.stationDataSubject.next(filtered);
      }
    }
  }
}

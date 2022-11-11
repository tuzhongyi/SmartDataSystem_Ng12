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
import { GarbageVehicleOperateBusiness } from './garbage-vehicle-operate.business';
import { AiopCameraConf, StationCameraConf } from './garbage-vehicle.config';
import { AICameraManageModel } from 'src/app/view-model/ai-camera-manage.model';
import { BehaviorSubject } from 'rxjs';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { TableColumnModel } from 'src/app/view-model/table.model';
import { TableSelectStateEnum } from 'src/app/enum/table-select-state.enum';
import { CommonTableComponent } from 'src/app/common/components/common-table/common.component';
import { Camera } from 'src/app/network/model/camera.model';
import { ConfirmDialogModel } from 'src/app/view-model/confirm-dialog.model';
import { DialogEnum } from 'src/app/enum/dialog.enum';
import { StationType } from 'src/app/enum/station-type.enum';
import { VehicleType } from 'src/app/enum/vehicle-type.enum';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { Language } from 'src/app/common/tools/language';
import { GarbageVehicleOperateCamerasBusiness } from './garbage-vehicle-operate-cameras.business';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { IModel } from 'src/app/network/model/model.interface';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';

@Component({
  selector: 'howell-garbage-vehicle-operate',
  templateUrl: './garbage-vehicle-operate.component.html',
  styleUrls: ['./garbage-vehicle-operate.component.less'],
  providers: [
    GarbageVehicleOperateBusiness,
    GarbageVehicleOperateCamerasBusiness,
  ],
})
export class GarbageVehicleOperateComponent
  implements IComponent<IModel, GarbageVehicle>, OnInit
{
  condition = '';

  FormState = FormState;
  SelectStrategy = SelectStrategy;
  //Table
  // 因为有编码设备信息，所以不能直接使用 AIOPCamera

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

  types: SelectItem[] = [];
  stationName: string = '';
  showConfirm = false;
  dialogModel = new ConfirmDialogModel('确认删除', '删除该项');

  showPageTwo = false;

  get title() {
    if (this.state == FormState.add) {
      return '添加清运车';
    } else if (this.state == FormState.edit) {
      return '编辑清运车';
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
  vehicle?: GarbageVehicle;

  @Output()
  closeEvent = new EventEmitter<boolean>();

  constructor(
    public business: GarbageVehicleOperateBusiness,
    private _fb: FormBuilder,
    private _toastrService: ToastrService
  ) {}

  async ngOnInit() {
    this.initTypes();
    this.loadData();
  }

  initTypes() {
    this.types.push(
      SelectItem.create(VehicleType.Tricycle, Language.VehicleType)
    );
    this.types.push(SelectItem.create(VehicleType.Car, Language.VehicleType));
  }

  async loadData() {
    this.vehicle = await this.business.load(this.vehicle);
  }

  // private async _init() {
  //   if (this.state == FormState.add || this.showPageTwo) {
  //     let res = await this._business.listAvailableCameras(this.condition);
  //     this._aiopDataSource = res;
  //   } else if (this.state == FormState.edit) {
  //     this._garbageStation = await this._business.getGarbageVehicle(
  //       this.stationId
  //     );
  //     console.log(this._garbageStation);
  //     this.type = this._garbageStation!.StationType;
  //   }
  //   this._updateForm();
  // }

  selectAiopTableRow(rows: AICameraManageModel[]) {
    this.aiopSelectedRows = rows;
  }
  selectstationTableRow(rows: Camera[]) {
    this.stationSelectedRows = rows;
  }

  search() {}
  aiopTableSelect(type: TableSelectStateEnum) {
    if (this.addTable) {
      switch (type) {
        case TableSelectStateEnum.All:
          this.addTable.selectAll();
          break;
        case TableSelectStateEnum.Reverse:
          this.addTable.selectReverse();
          break;
        case TableSelectStateEnum.Cancel:
          this.addTable.selectCancel();
          break;
        default:
          throw new TypeError('类型错误');
      }
    }
  }
  stationTableSelect(type: TableSelectStateEnum) {
    if (this.editTable) {
      switch (type) {
        case TableSelectStateEnum.All:
          this.editTable.selectAll();
          break;
        case TableSelectStateEnum.Reverse:
          this.editTable.selectReverse();
          break;
        case TableSelectStateEnum.Cancel:
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
  }
  deleteBtnClick() {
    this.willBeDeleted = [...this.stationSelectedRows];
    this.showConfirm = true;
    this.dialogModel.content = `删除${this.willBeDeleted.length}个选项?`;
  }

  // dialogMsgEvent(status: DialogEnum) {
  //   this.showConfirm = false;
  //   if (status == DialogEnum.confirm) {
  //     this._deleteRows(this.willBeDeleted);
  //   } else if (status == DialogEnum.cancel) {
  //   }
  // }
  // async onSubmit() {
  //   if (this._checkForm()) {
  //     if (this.state == FormState.add) {
  //       let station = new GarbageVehicle();
  //       station.Id = '';
  //       station.DivisionId = this.divisionId;
  //       station.Name = this.stationName;
  //       station.StationType = this.type;
  //       station.MaxDryVolume = 0;
  //       station.MaxWetVolume = 0;
  //       station.StationState = 0;
  //       station.UpdateTime = new Date();
  //       station.CreateTime = new Date();
  //       let res = await this._business.createGarbageVehicle(station);

  //       if (res) {
  //         console.log(res);
  //         this.aiopSelectedRows.map((row) => {
  //           let camera = new Camera();
  //           camera.Id = row.Id;
  //           camera.CreateTime = new Date();
  //           camera.UpdateTime = new Date();
  //           camera.Name = row.Name;
  //           camera.GarbageVehicleId = res.Id;

  //           return this._business.addCameraToGarbageVehicle(camera);
  //         });

  //         this._toastrService.success('操作成功');
  //         this.closeEvent.emit(true);
  //       }
  //     } else if (this.state == FormState.edit) {
  //       if (this._garbageStation) {
  //         this._garbageStation.Name = this.stationName;
  //         this._garbageStation.StationType = this.type;
  //         this._garbageStation.UpdateTime = new Date();

  //         let res = await this._business.updateGarbageVehicle(
  //           this._garbageStation
  //         );
  //         if (res) {
  //           this._toastrService.success('操作成功');
  //           this.closeEvent.emit(true);
  //         }
  //       }
  //     }
  //   }
  // }
  onReset() {
    this.closeEvent.emit(false);
  }

  // async onConfirm() {
  //   if (this._garbageStation) {
  //     let len = this.aiopSelectedRows.length;
  //     if (len) {
  //       for (let i = 0; i < len; i++) {
  //         let row = this.aiopSelectedRows[i];
  //         let camera = new Camera();
  //         camera.Id = row.Id;
  //         camera.CreateTime = new Date();
  //         camera.UpdateTime = new Date();
  //         camera.Name = row.Name;
  //         camera.GarbageVehicleId = this._garbageStation.Id;

  //         await this._business.addCameraToGarbageVehicle(camera);
  //       }
  //       this._toastrService.success('操作成功');
  //       this.onCancel();
  //       this._init();
  //       return;
  //     }
  //   }
  //   this.onCancel();
  // }
  // onCancel() {
  //   this.showPageTwo = false;
  //   this.condition = '';
  //   this._aiopDataSource = [];
  //   this.aiopDataSubject.next(this._aiopDataSource);
  // }

  private _checkForm() {
    if (this.stationName == '') {
      return this._toastrService.warning('请输入厢房名称');
    }
    return true;
  }
  // private async _deleteRows(rows: Camera[]) {
  //   this.addTable?.deleteRows(rows);
  //   for (let i = 0; i < rows.length; i++) {
  //     let id = rows[i].Id;
  //     await this._business.deleteCameraInGarbageVehicle(this.stationId, id);
  //     this._toastrService.success('删除成功');
  //   }
  //   this._init();
  // }
  // private _updateForm() {
  //   if (this.state == FormState.add || this.showPageTwo) {
  //     this.aiopDataSubject.next(this._aiopDataSource);
  //   } else if (this.state == FormState.edit) {
  //     if (this._garbageStation) {
  //       this.stationName = this._garbageStation.Name;
  //       this.type = this._garbageStation.StationType;

  //       let cameras = this._garbageStation.Cameras ?? [];
  //       let filtered = cameras.filter((camera) =>
  //         camera.Name.includes(this.condition)
  //       );
  //       this.stationDataSubject.next(filtered);
  //     }
  //   }
  // }
}

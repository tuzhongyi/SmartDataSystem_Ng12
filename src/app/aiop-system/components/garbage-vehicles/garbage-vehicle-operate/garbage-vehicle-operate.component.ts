import {
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
import { AICameraManageModel } from 'src/app/view-model/ai-camera-manage.model';
import { BehaviorSubject } from 'rxjs';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { TableColumnModel } from 'src/app/view-model/table.model';
import { TableSelectStateEnum } from 'src/app/enum/table-select-state.enum';
import { CommonTableComponent } from 'src/app/common/components/common-table/common.component';
import { ConfirmDialogModel } from 'src/app/view-model/confirm-dialog.model';
import { DialogEnum } from 'src/app/enum/dialog.enum';
import {
  IGarbageVehicleOperateBusiness,
  IGarbageVehicleOperateComponent,
} from './garbage-vehicle-operate.model';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { AiopCameraConf, VehicleCameraConf } from './garbage-vehicle.config';
import { GarbageVehicleOperateCameraBusiness } from './business/garbage-vehicle-operate-camera.business';
import { GarbageVehicleOperateAICameraBusiness } from './business/garbage-vehicle-operate-ai-camera.business';
import { GarbageVehicleOperateVehicleCameraBusiness } from './business/garbage-vehicle-operate-vehicle-camera.business';
import { VehicleType } from 'src/app/enum/vehicle-type.enum';
import { VehicleCamera } from 'src/app/network/model/vehicle-camera.model';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { Language } from 'src/app/common/tools/language';
import { GarbageVehicleOperateBusiness } from './business/garbage-vehicle-operate.business';

@Component({
  selector: 'howell-garbage-vehicle-operate',
  templateUrl: './garbage-vehicle-operate.component.html',
  styleUrls: ['./garbage-vehicle-operate.component.less'],
  providers: [
    GarbageVehicleOperateBusiness,
    GarbageVehicleOperateCameraBusiness,
    GarbageVehicleOperateAICameraBusiness,
    GarbageVehicleOperateVehicleCameraBusiness,
  ],
})
export class GarbageVehicleOperateComponent
  implements IGarbageVehicleOperateComponent, OnInit
{
  private _garbageVehicle?: GarbageVehicle;
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

  vehicleDataSubject = new BehaviorSubject<VehicleCamera[]>([]);
  vehicleColumnModel: TableColumnModel[] = [...VehicleCameraConf]; // 表格列配置详情
  vehicleDisplayedColumns: string[] = this.vehicleColumnModel.map(
    (model) => model.columnDef
  );
  vehicleSelectedRows: VehicleCamera[] = [];
  willBeDeleted: VehicleCamera[] = [];

  vehicleTypes: SelectItem[] = [];
  vehicleType: VehicleType = VehicleType.Tricycle;
  vehicleName: string = '';
  showConfirm = false;
  dialogModel = new ConfirmDialogModel('确认删除', '删除该项');

  showPageTwo = false;

  myForm = this._fb.group({
    Name: '',
    VehicleType: '',
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
    return !!this.vehicleSelectedRows.length;
  }

  @ViewChild('addTable') addTable?: CommonTableComponent;
  @ViewChild('editTable') editTable?: CommonTableComponent;

  @Input()
  state: FormState = FormState.none;

  @Input()
  vehicleId: string = '';

  @Input()
  divisionId: string = '';

  @Output()
  closeEvent = new EventEmitter<boolean>();

  constructor(
    business: GarbageVehicleOperateBusiness,
    private _fb: FormBuilder,
    private _toastrService: ToastrService
  ) {
    this.business = business;
  }
  business: IGarbageVehicleOperateBusiness;

  async ngOnInit() {
    this.initTypes();
    this.initVehicleType();
    this._init();
  }

  initTypes() {
    this.vehicleTypes.push(
      SelectItem.create(VehicleType.Tricycle, Language.VehicleType)
    );
    this.vehicleTypes.push(
      SelectItem.create(VehicleType.Car, Language.VehicleType)
    );
  }

  private async _init() {
    if (this.state == FormState.add || this.showPageTwo) {
      let res = await this.business.camera.load(this.condition);
      this._aiopDataSource = res;
    } else if (this.state == FormState.edit) {
      this._garbageVehicle = await this.business.load(this.vehicleId);
      console.log(this._garbageVehicle);
      this.vehicleType = this._garbageVehicle!.VehicleType;
    }
    this._updateForm();
  }

  initVehicleType() {
    // this.vehicleTypes.push(
    //   SelectItem.create(VehicleType.Garbage, Language.VehicleType)
    // );
    // this.vehicleTypes.push(
    //   SelectItem.create(VehicleType.Construction, Language.VehicleType)
    // );
    // this.vehicleType = this.vehicleTypes[0].value;
  }

  selectAiopTableRow(rows: AICameraManageModel[]) {
    this.aiopSelectedRows = rows;
  }
  selectvehicleTableRow(rows: VehicleCamera[]) {
    this.vehicleSelectedRows = rows;
  }

  search() {
    this._init();
  }
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
  vehicleTableSelect(type: TableSelectStateEnum) {
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
    this._init();
  }
  deleteBtnClick() {
    this.willBeDeleted = [...this.vehicleSelectedRows];
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
        let vehicle = new GarbageVehicle();
        vehicle.Id = '';
        vehicle.DivisionId = this.divisionId;
        vehicle.Name = this.vehicleName;
        vehicle.VehicleType = this.vehicleType;
        vehicle.UpdateTime = new Date();
        vehicle.CreateTime = new Date();
        let res = await this.business.create(vehicle);

        if (res) {
          console.log(res);
          this.aiopSelectedRows.map((row) => {
            let camera = new VehicleCamera();
            camera.Id = row.Id;
            camera.CreateTime = new Date();
            camera.UpdateTime = new Date();
            camera.Name = row.Name;
            camera.GarbageVehicleId = res.Id;

            return this.business.camera.vehicle.create(camera);
          });

          this._toastrService.success('操作成功');
          this.closeEvent.emit(true);
        }
      } else if (this.state == FormState.edit) {
        if (this._garbageVehicle) {
          this._garbageVehicle.Name = this.vehicleName;
          this._garbageVehicle.VehicleType = this.vehicleType;
          this._garbageVehicle.UpdateTime = new Date();

          let res = await this.business.update(this._garbageVehicle);
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
    if (this._garbageVehicle) {
      let len = this.aiopSelectedRows.length;
      if (len) {
        for (let i = 0; i < len; i++) {
          let row = this.aiopSelectedRows[i];
          let camera = new VehicleCamera();
          camera.Id = row.Id;
          camera.CreateTime = new Date();
          camera.UpdateTime = new Date();
          camera.Name = row.Name;
          camera.GarbageVehicleId = this._garbageVehicle.Id;

          await this.business.camera.vehicle.create(camera);
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
    if (this.vehicleName == '') {
      return this._toastrService.warning('请输入厢房名称');
    }
    return true;
  }
  private async _deleteRows(rows: VehicleCamera[]) {
    this.addTable?.deleteRows(rows);
    for (let i = 0; i < rows.length; i++) {
      let id = rows[i].Id;
      await this.business.camera.vehicle.delete(this.vehicleId, id);
      this._toastrService.success('删除成功');
    }
    this._init();
  }
  private _updateForm() {
    if (this.state == FormState.add || this.showPageTwo) {
      this.aiopDataSubject.next(this._aiopDataSource);
    } else if (this.state == FormState.edit) {
      if (this._garbageVehicle) {
        this.vehicleName = this._garbageVehicle.Name;
        this.vehicleType = this._garbageVehicle.VehicleType;

        let cameras = this._garbageVehicle.Cameras ?? [];
        let filtered = cameras.filter((camera) =>
          camera.Name.includes(this.condition)
        );
        this.vehicleDataSubject.next(filtered);
      }
    }
  }
}

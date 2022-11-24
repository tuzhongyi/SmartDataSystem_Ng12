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
  @Input()
  business: IGarbageVehicleOperateBusiness;
  @Input()
  source: GarbageVehicle = GarbageVehicle.Create();

  constructor(business: GarbageVehicleOperateBusiness) {
    this.business = business;
  }
  vehicleTypes: SelectItem[] = [];

  ngOnInit(): void {
    this.initTypes();
  }

  initTypes() {
    this.vehicleTypes.push(
      SelectItem.create(VehicleType.Tricycle, Language.VehicleType)
    );
    this.vehicleTypes.push(
      SelectItem.create(VehicleType.Car, Language.VehicleType)
    );
  }

  onNoChanged(num: any) {
    this.source.No = num;
  }
  onHeartbeatIntervalChanged(num: any) {
    this.source.HeartbeatInterval = num;
  }
  onShutdownSecondsChanged(num: any) {
    this.source.ShutdownSeconds = num;
  }

  onCancel() {}
  onConfirm() {}
}

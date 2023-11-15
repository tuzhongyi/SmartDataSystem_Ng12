import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { ToastrService } from 'ngx-toastr';
import { Language } from 'src/app/common/tools/language';
import { VehicleType } from 'src/app/enum/vehicle-type.enum';
import { GarbageVehicle } from 'src/app/network/model/garbage-station/garbage-vehicle.model';
import { AIOPGarbageVehicleDetailsBusiness } from './aiop-garbage-vehicle-details.business';

@Component({
  selector: 'aiop-garbage-vehicle-details',
  templateUrl: './aiop-garbage-vehicle-details.component.html',
  styleUrls: ['./aiop-garbage-vehicle-details.component.less'],
  providers: [AIOPGarbageVehicleDetailsBusiness],
})
export class AIOPGarbageVehicleDetailsComponent implements OnInit {
  @Input()
  model?: GarbageVehicle;
  @Output()
  ok: EventEmitter<GarbageVehicle> = new EventEmitter();
  @Output()
  cancel: EventEmitter<void> = new EventEmitter();

  constructor(
    private business: AIOPGarbageVehicleDetailsBusiness,
    private toastr: ToastrService
  ) {}

  instance = new GarbageVehicle();

  ngOnInit(): void {
    if (this.model) {
      let plain = instanceToPlain(this.model);
      this.instance = plainToInstance(GarbageVehicle, plain);
    }
  }

  VehicleType = VehicleType;
  Language = Language;

  check() {
    if (!this.instance.Id) {
      this.toastr.warning('请填写ID');
      return false;
    }
    if (!this.instance.No) {
      this.toastr.warning('请填写NO');
      return false;
    }
    if (!this.instance.Name) {
      this.toastr.warning('请填写车辆名称');
      return false;
    }
    if (!this.instance.VehicleType) {
      this.toastr.warning('请选择车辆类型');
      return false;
    }
    if (!this.instance.IMEI) {
      this.toastr.warning('请填写IMEI');
      return false;
    }

    return true;
  }

  oncancel() {
    this.cancel.emit();
  }
  onok() {
    if (this.check()) {
      this.business
        .update(this.instance)
        .then((x) => {
          this.toastr.success('操作成功');
          this.ok.emit(this.model);
        })
        .catch((x) => {
          console.error(x);
          this.toastr.error('操作失败');
        });
    }
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WindowComponent } from 'src/app/common/components/window-control/window.component';
import { VehicleCameraModelConverter } from 'src/app/converter/view-models/vehicle-camera.model.converter';
import { CameraUsage } from 'src/app/enum/camera-usage.enum';
import { VehiclePositionNo } from 'src/app/enum/position-no.enum';
import { GarbageVehicle } from 'src/app/network/model/garbage-station/garbage-vehicle.model';
import { VehicleCamera } from 'src/app/network/model/garbage-station/vehicle-camera.model';
import { VehicleCameraModel } from 'src/app/network/view-model/vehicle-camera.view-model';
import { GarbageVehicleCameraDetailsWindowBusiness } from './garbage-vehicle-camera-details-window.business';

@Component({
  selector: 'garbage-vehicle-camera-details-window',
  templateUrl: './garbage-vehicle-camera-details-window.component.html',
  styleUrls: ['./garbage-vehicle-camera-details-window.component.less'],
  providers: [GarbageVehicleCameraDetailsWindowBusiness],
})
export class GarbageVehicleCameraDetailsWindowComponent
  extends WindowComponent
  implements OnInit
{
  @Input()
  open?: EventEmitter<VehicleCamera>;
  @Output()
  no: EventEmitter<void> = new EventEmitter();
  @Output()
  yes: EventEmitter<VehicleCamera> = new EventEmitter();

  constructor(
    private business: GarbageVehicleCameraDetailsWindowBusiness,
    private toastr: ToastrService,
    private converter: VehicleCameraModelConverter
  ) {
    super();
    this.style.width = '400px';
    this.style.height = 'auto';
  }

  model?: VehicleCameraModel;

  positions: VehiclePositionNo[] = [];
  vehicles: GarbageVehicle[] = [];
  CameraUsage = CameraUsage;

  ngOnInit(): void {
    if (this.open) {
      this.open.subscribe((x) => {
        this.model = this.converter.Convert(x);
        this.Model.show = true;
      });
    }
    this.initVehicles();
  }

  async initVehicles() {
    this.vehicles = await this.business.get();
  }

  check() {
    if (this.model) {
      if (!this.model.Name) {
        this.toastr.warning('请填写名称');
        return false;
      }
    }
    return true;
  }

  onyes() {
    if (this.check()) {
      this.yes.emit(this.model);
      this.Model.show = false;
    }
  }
  oncancel() {
    this.no.emit();
    this.Model.show = false;
  }
}

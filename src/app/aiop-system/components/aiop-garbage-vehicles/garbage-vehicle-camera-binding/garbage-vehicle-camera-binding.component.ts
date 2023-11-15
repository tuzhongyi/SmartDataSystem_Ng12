import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DivisionTreeSource } from 'src/app/common/components/division-tree/division-tree.model';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { AICamera } from 'src/app/network/model/garbage-station/ai-camera.model';
import { GarbageVehicle } from 'src/app/network/model/garbage-station/garbage-vehicle.model';
import { VehicleCamera } from 'src/app/network/model/garbage-station/vehicle-camera.model';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { GarbageVehicleCameraBindingBusiness } from './garbage-vehicle-camera-binding.business';
import {
  IGarbageVehicleCameraBindingBusiness,
  IGarbageVehicleCameraBindingComponent,
} from './garbage-vehicle-camera-binding.model';

@Component({
  selector: 'garbage-vehicle-camera-binding',
  templateUrl: './garbage-vehicle-camera-binding.component.html',
  styleUrls: ['./garbage-vehicle-camera-binding.component.less'],
  providers: [GarbageVehicleCameraBindingBusiness],
})
export class GarbageVehicleCameraBindingComponent
  implements IGarbageVehicleCameraBindingComponent, OnInit
{
  @Input()
  business: IGarbageVehicleCameraBindingBusiness;

  constructor(
    business: GarbageVehicleCameraBindingBusiness,
    private toastr: ToastrService
  ) {
    this.business = business;
  }

  binding = true;
  selectStrategy: SelectStrategy = SelectStrategy.Single;

  ngOnInit(): void {}

  selectedUnbind: AICamera[] = [];
  selectedBinded: VehicleCamera[] = [];
  vehicle?: GarbageVehicle;
  cameraLoad: EventEmitter<string[]> = new EventEmitter();
  treeLoad: EventEmitter<void> = new EventEmitter();

  ontreeloaded(datas: DivisionTreeSource[]) {
    let ids = datas.filter((x) => x instanceof VehicleCamera).map((x) => x.Id);
    this.cameraLoad.emit(ids);
  }

  onselect(selecteds: CommonFlatNode<DivisionTreeSource>[]) {
    this.vehicle = undefined;
    this.selectedBinded = [];
    for (let i = 0; i < selecteds.length; i++) {
      const selected = selecteds[i];
      if (selected.RawData instanceof GarbageVehicle) {
        this.vehicle = selected.RawData as GarbageVehicle;
      }
      if (selected.RawData instanceof VehicleCamera) {
        this.selectedBinded.push(selected.RawData);
      }
    }
  }

  onbinding() {
    if (!this.vehicle) {
      this.toastr.warning('请选择清运车');
      return;
    }
    this.business
      .create(this.vehicle.Id, this.selectedUnbind)
      .then((cameras) => {
        let ids = cameras.map((x) => x.Id);
        this.cameraLoad.emit(ids);
        this.treeLoad.emit();
      });
  }
  onunbind() {
    if (this.selectedBinded.length <= 0) return;
    let vehicleId = this.selectedBinded[0].GarbageVehicleId;
    let ids = this.selectedBinded.map((x) => x.Id);

    this.business.delete(vehicleId, ids).then((cameras) => {
      let ids = cameras.map((x) => x.Id);
      this.cameraLoad.emit(ids);
      this.treeLoad.emit();
    });
  }
  onmodelchanged() {
    this.binding = !this.binding;

    this.selectStrategy = this.binding
      ? SelectStrategy.Single
      : SelectStrategy.Multiple;
  }
}

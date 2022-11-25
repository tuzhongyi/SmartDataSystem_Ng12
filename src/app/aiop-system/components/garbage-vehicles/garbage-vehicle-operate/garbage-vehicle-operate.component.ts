import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  IGarbageVehicleOperateBusiness,
  IGarbageVehicleOperateComponent,
} from './garbage-vehicle-operate.model';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { GarbageVehicleOperateCameraBusiness } from './business/garbage-vehicle-operate-camera.business';
import { VehicleType } from 'src/app/enum/vehicle-type.enum';
import { VehicleCamera } from 'src/app/network/model/vehicle-camera.model';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { Language } from 'src/app/common/tools/language';
import { GarbageVehicleOperateBusiness } from './business/garbage-vehicle-operate.business';
import { AICameraModel } from 'src/app/view-model/ai-camera.model';
import { Creater } from 'src/app/common/tools/creater';

@Component({
  selector: 'howell-garbage-vehicle-operate',
  templateUrl: './garbage-vehicle-operate.component.html',
  styleUrls: ['./garbage-vehicle-operate.component.less'],
  providers: [
    GarbageVehicleOperateBusiness,
    GarbageVehicleOperateCameraBusiness,
  ],
})
export class GarbageVehicleOperateComponent
  implements IGarbageVehicleOperateComponent, OnInit, OnChanges
{
  @Input()
  business: IGarbageVehicleOperateBusiness;
  @Input()
  source?: GarbageVehicle = Creater.GarbageVehicle();
  @Output()
  cancel: EventEmitter<void> = new EventEmitter();
  @Output()
  confirm: EventEmitter<GarbageVehicle> = new EventEmitter();

  constructor(business: GarbageVehicleOperateBusiness) {
    this.business = business;
  }
  vehicleTypes: SelectItem[] = [];

  private _cameras: AICameraModel[] = [];
  public get cameras(): AICameraModel[] {
    return this._cameras;
  }
  public set cameras(v: AICameraModel[]) {
    this._cameras = v;
    if (this.source) {
      this.source.Cameras = this._cameras.map((x) => {
        let camera = this.business.camera.Converter!.Convert(
          x
        ) as VehicleCamera;
        if (this.source) {
          camera.GarbageVehicleId = this.source.Id;
        }
        return camera;
      });
    }
  }

  ngOnInit(): void {
    this.initTypes();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.source) {
      if (!this.source) {
        this.source = Creater.GarbageVehicle();
      }
    }
  }

  initTypes() {
    this.vehicleTypes.push(
      SelectItem.create(VehicleType.Tricycle, Language.VehicleType)
    );
    this.vehicleTypes.push(
      SelectItem.create(VehicleType.Car, Language.VehicleType)
    );
  }

  remove(item: VehicleCamera): void {
    if (this.source && this.source.Cameras) {
      const index = this.source.Cameras.indexOf(item);
      if (index >= 0) {
        this.source.Cameras.splice(index, 1);
        this.cameras.splice(index, 1);
      }
    }
  }

  // onNodeSelected(nodes: CommonFlatNode[]) {
  //   this.nodes = [];
  //   for (let i = 0; i < nodes.length; i++) {
  //     const node = nodes[i];
  //     if (this.nodes.map((x) => x.Id).includes(node.Id)) {
  //       continue;
  //     }
  //     if (node.RawData instanceof RegionNode) {
  //       this.nodes.push(node.RawData);
  //     }
  //   }
  // }

  onNoChanged(num: any) {
    if (this.source) {
      this.source.No = num;
    }
  }
  onHeartbeatIntervalChanged(num: any) {
    if (this.source) {
      this.source.HeartbeatInterval = num;
    }
  }
  onShutdownSecondsChanged(num: any) {
    if (this.source) {
      this.source.ShutdownSeconds = num;
    }
  }

  onCancel() {
    this.cancel.emit();
  }
  onConfirm() {
    this.confirm.emit(this.source);
  }
}

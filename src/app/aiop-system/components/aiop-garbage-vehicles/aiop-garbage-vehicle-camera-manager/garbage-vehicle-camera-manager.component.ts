import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogModel } from 'src/app/common/components/confirm-dialog/confirm-dialog.model';
import { DivisionTreeSource } from 'src/app/common/components/division-tree/division-tree.model';
import { AiopGarbageVehicleCameraTableArgs } from 'src/app/common/components/tables/aiop-garbage-vehicle-camera-table/aiop-garbage-vehicle-camera-table.model';
import { FileReadType } from 'src/app/common/components/upload-control/upload-control.model';
import { Creater } from 'src/app/common/tools/creater';
import { DialogEnum } from 'src/app/enum/dialog.enum';
import { FormState } from 'src/app/enum/form-state.enum';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { VehicleCamera } from 'src/app/network/model/garbage-station/vehicle-camera.model';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { GarbageVehicleCameraManagerBusiness } from './garbage-vehicle-camera-manager.business';
import {
  IGarbageVehicleCameraManagerBusiness,
  IGarbageVehicleCameraManagerComponent,
} from './garbage-vehicle-camera-manager.model';

@Component({
  selector: 'garbage-vehicle-camera-manager',
  templateUrl: './garbage-vehicle-camera-manager.component.html',
  styleUrls: ['./garbage-vehicle-camera-manager.component.less'],
  providers: [GarbageVehicleCameraManagerBusiness],
})
export class GarbageVehicleCameraManagerComponent
  implements IGarbageVehicleCameraManagerComponent, OnInit
{
  @Input()
  business: IGarbageVehicleCameraManagerBusiness;

  constructor(
    business: GarbageVehicleCameraManagerBusiness,
    private toastr: ToastrService
  ) {
    this.business = business;
  }

  ngOnInit(): void {}
  state: FormState = FormState.none;

  open: EventEmitter<VehicleCamera> = new EventEmitter();
  enabled = {
    add: false,
    delete: false,
  };

  args = new AiopGarbageVehicleCameraTableArgs();
  load: EventEmitter<AiopGarbageVehicleCameraTableArgs> = new EventEmitter();

  dialog = new ConfirmDialogModel('确认删除', '删除该项');

  selecteds: VehicleCamera[] = [];

  // 点击树节点
  selectTreeNode(nodes: CommonFlatNode<DivisionTreeSource>[]) {
    this.args.divisionId = undefined;
    for (let i = 0; i < nodes.length; i++) {
      const item = nodes[i];
      if (item.RawData instanceof Division) {
        let vehicle = item.RawData;
        this.args.divisionId = vehicle.Id;
        this.enabled.add = !!this.args.divisionId;
        this.args.tofirst = true;
        this.load.emit(this.args);
        return;
      }
    }
  }

  tocreate() {
    this.open.emit(Creater.VehicleCamera());
    this.state = FormState.add;
  }
  toupdate(model: VehicleCamera) {
    this.business.get(model.GarbageVehicleId, model.Id).then((camra) => {
      this.open.emit(camra);
      this.state = FormState.edit;
    });
  }
  todelete() {
    this.dialog.content = `删除${this.selecteds.length}个选项?`;
    this.dialog.show = true;
  }
  onsearch(name: string) {
    this.args.name = name;
    this.args.tofirst = true;
    this.load.emit(this.args);
  }

  onyes(model: VehicleCamera) {
    switch (this.state) {
      case FormState.add:
        this.oncreate(model);
        break;
      case FormState.edit:
        this.onupdate(model);
        break;
      default:
        break;
    }
  }

  ondelete(result: DialogEnum) {
    if (result === DialogEnum.confirm) {
      this.business
        .delete(this.selecteds)
        .then((x) => {
          this.toastr.success('删除成功');
          this.enabled.delete = false;
          this.args.tofirst = false;
          this.load.emit(this.args);
        })
        .catch((x) => {
          this.toastr.warning('删除失败');
        });
    }
    this.dialog.show = false;
  }

  oncreate(model: VehicleCamera) {
    if (this.args.divisionId) {
      model.GarbageVehicleId = this.args.divisionId;
      this.business
        .create(model)
        .then((x) => {
          this.toastr.success('创建成功');
          this.args.tofirst = false;
          this.load.emit(this.args);
        })
        .catch((x) => {
          this.toastr.warning('创建失败');
        });
    }
  }
  onupdate(model: VehicleCamera) {
    this.business
      .update(model)
      .then((x) => {
        this.toastr.success('修改成功');
        this.args.tofirst = false;
        this.load.emit(this.args);
      })
      .catch((x) => {
        this.toastr.warning('修改失败');
      });
  }
  FileReadType = FileReadType;
  onupload(data: any) {
    this.business.upload(data).then((x) => {
      this.args.tofirst = false;
      this.load.emit(this.args);
    });
  }
  ondownload() {
    this.business.download();
  }
}

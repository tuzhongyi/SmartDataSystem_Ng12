import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DivisionTreeSource } from 'src/app/common/components/division-tree/division-tree.model';
import { FileReadType } from 'src/app/common/components/upload-control/upload-control.model';
import { Creater } from 'src/app/common/tools/creater';
import { DialogEnum } from 'src/app/enum/dialog.enum';
import { FormState } from 'src/app/enum/form-state.enum';
import { Division } from 'src/app/network/model/division.model';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { VehicleCamera } from 'src/app/network/model/vehicle-camera.model';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { ConfirmDialogModel } from 'src/app/view-model/confirm-dialog.model';
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
  load: EventEmitter<string> = new EventEmitter();
  open: EventEmitter<VehicleCamera> = new EventEmitter();
  enabled = {
    add: false,
    delete: false,
  };

  divisionId?: string;

  dialog = new ConfirmDialogModel('确认删除', '删除该项');

  private _selected: VehicleCamera[] = [];
  public get selected(): VehicleCamera[] {
    return this._selected;
  }
  public set selected(v: VehicleCamera[]) {
    this._selected = v;
    this.enabled.delete = this._selected && this._selected.length > 0;
  }

  // 点击树节点
  selectTreeNode(nodes: CommonFlatNode<DivisionTreeSource>[]) {
    this.divisionId = undefined;
    for (let i = 0; i < nodes.length; i++) {
      const item = nodes[i];
      if (item.RawData instanceof Division) {
        let vehicle = item.RawData;
        this.divisionId = vehicle.Id;
        this.enabled.add = !!this.divisionId;
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
    this.dialog.content = `删除${this.selected.length}个选项?`;
    this.dialog.show = true;
  }
  onsearch(name: string) {
    this.load.emit(name);
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
        .delete(this.selected)
        .then((x) => {
          this.toastr.success('删除成功');
          this.load.emit();
        })
        .catch((x) => {
          this.toastr.warning('删除失败');
        });
    }
    this.dialog.show = false;
  }

  oncreate(model: VehicleCamera) {
    if (this.divisionId) {
      model.GarbageVehicleId = this.divisionId;
      this.business
        .create(model)
        .then((x) => {
          this.toastr.success('创建成功');
          this.load.emit();
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
        this.load.emit();
      })
      .catch((x) => {
        this.toastr.warning('修改失败');
      });
  }
  FileReadType = FileReadType;
  onupload(data: any) {
    this.business.upload(data).then((x) => {
      this.load.emit();
    });
  }
  ondownload() {
    this.business.download();
  }
}

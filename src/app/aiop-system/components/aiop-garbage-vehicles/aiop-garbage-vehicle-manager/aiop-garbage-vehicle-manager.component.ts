import { Component, EventEmitter, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';

import { GarbageVehicle } from 'src/app/network/model/garbage-station/garbage-vehicle.model';
import { GarbageVehicleManageBusiness as AIOPGarbageVehicleManageBusiness } from './aiop-garbage-vehicle-manager.business';

import { DivisionTreeSource } from 'src/app/common/components/division-tree/division-tree.model';
import { AIOPGarbageVehicleTableArgs } from 'src/app/common/components/tables/aiop-garbage-vehicle-table/aiop-garbage-vehicle-table.model';
import {
  FileReadType,
  FileResult,
} from 'src/app/common/components/upload-control/upload-control.model';
import { GarbageVehicleManagerWindow } from './aiop-garbage-vehicle-manager.model';

@Component({
  selector: 'howell-garbage-vehicle-manage',
  templateUrl: './aiop-garbage-vehicle-manager.component.html',
  styleUrls: ['./aiop-garbage-vehicle-manager.component.less'],
  providers: [AIOPGarbageVehicleManageBusiness],
})
export class AIOPGarbageVehicleManageComponent implements OnInit {
  constructor(
    private business: AIOPGarbageVehicleManageBusiness,
    private toastr: ToastrService
  ) {}

  args = new AIOPGarbageVehicleTableArgs();
  load = new EventEmitter<AIOPGarbageVehicleTableArgs>();
  selecteds: GarbageVehicle[] = [];
  window = new GarbageVehicleManagerWindow();
  FileReadType = FileReadType;

  async ngOnInit() {}

  // 点击树节点
  ondivision(nodes: CommonFlatNode<DivisionTreeSource>[]) {
    if (nodes && nodes.length > 0) {
      this.args.divisionId = nodes[0].Id;
    }
  }

  async onsearch(name: string) {
    this.args.name = name;
    this.args.tofirst = true;
    this.load.emit(this.args);
  }

  onupload(data: FileResult) {
    this.business.upload(data as ArrayBuffer);
  }
  ondownload() {
    this.business.download();
  }
  todelete() {
    this.window.confirm.language = `是否删除 ${this.selecteds
      .map((x) => x.Name)
      .join(',')} ？`;
    this.window.confirm.show = true;
  }
  ondelete() {
    if (this.selecteds.length > 0) {
      this.business
        .delete(this.selecteds.map((x) => x.Id))
        .then((x) => {
          this.toastr.success('操作成功');
          this.selecteds = [];
          this.args.tofirst = false;
          this.load.emit(this.args);
        })
        .catch((e) => {
          console.error(e);
          this.toastr.success('操作失败');
        })
        .finally(() => {
          this.window.confirm.show = false;
        });
    }
  }
  ondetails(item: GarbageVehicle) {
    this.window.details.model = item;
    this.window.details.show = true;
  }
  onupdate() {
    this.args.tofirst = false;
    this.load.emit(this.args);
  }
  oncameras(item: GarbageVehicle) {
    if (item && item.Cameras && item.Cameras.length > 0) {
      this.window.cameras.model = item;
      this.window.cameras.show = true;
    }
  }
  onparams(item: GarbageVehicle) {
    this.window.params.model = item;
    this.window.params.show = true;
  }
  oncommand(item: GarbageVehicle) {
    this.window.command.model = item;
    this.window.command.show = true;
  }
}

import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DivisionTreeSource } from 'src/app/common/components/division-tree/division-tree.model';
import { AIOPGarbageStationTableArgs } from 'src/app/common/components/tables/aiop-garbage-station-table/aiop-garbage-station-table.model';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { GarbageStationModel } from 'src/app/view-model/garbage-station.model';
import { AIOPGarbageStationManagerBusiness } from './aiop-garbage-station-manager.business';
import { AIOPGarbageStationManagerWindow } from './aiop-garbage-station-manager.model';

@Component({
  selector: 'aiop-garbage-station-manager',
  templateUrl: './aiop-garbage-station-manager.component.html',
  styleUrls: ['./aiop-garbage-station-manager.component.less'],
  providers: [AIOPGarbageStationManagerBusiness],
})
export class AIOPGarbageStationManagerComponent implements OnInit {
  constructor(
    private business: AIOPGarbageStationManagerBusiness,
    private toastr: ToastrService
  ) {}

  @ViewChild('file')
  file?: ElementRef;

  args = new AIOPGarbageStationTableArgs();
  load = new EventEmitter<AIOPGarbageStationTableArgs>();
  window = new AIOPGarbageStationManagerWindow();

  selected: GarbageStationModel[] = [];

  ngOnInit(): void {}
  ondivision(nodes: CommonFlatNode<DivisionTreeSource>[]) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      this.args.divisionId = node.Id;
      this.load.emit(this.args);
      return;
    }
  }
  onsearch(name: string) {
    this.args.name = name;
    this.load.emit(this.args);
  }

  ondetails(model: GarbageStationModel) {
    this.window.details.model = model;
    this.window.details.show = true;
  }
  ondetailsok() {
    this.window.details.clear();
    this.window.details.show = false;
    this.load.emit(this.args);
  }

  oncreate() {
    if (this.args.divisionId) {
      this.window.details.model = new GarbageStationModel();
      this.window.details.model.DivisionId = this.args.divisionId;
      this.window.details.show = true;
    } else {
      this.toastr.warning('请选择区划');
    }
  }

  onexport() {
    if (this.args.divisionId) {
      this.business.download('垃圾箱放信息', this.args.divisionId).then((x) => {
        this.toastr.success('操作成功');
      });
    } else {
      this.toastr.warning('请选择区划');
    }
  }
  onimport() {
    if (this.file) {
      this.file.nativeElement.click();
    }
  }
  onfile() {
    if (this.file) {
      const t_files = this.file.nativeElement.files;
      if (t_files.length > 0) {
        this.business
          .upload(t_files[0])
          .then((x) => {
            this.toastr.success('操作成功');
            this.load.emit(this.args);
          })
          .catch((x) => {
            this.toastr.error('操作失败');
          });
        this.file.nativeElement.value = null;
      }
    }
  }
}

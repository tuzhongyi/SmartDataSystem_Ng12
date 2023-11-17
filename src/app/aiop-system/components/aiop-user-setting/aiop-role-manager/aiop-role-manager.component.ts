import { Component, EventEmitter, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AIOPRoleTableArgs } from 'src/app/common/components/tables/aiop-role-table/aiop-role-table.model';
import { Role } from 'src/app/network/model/garbage-station/role.model';
import { AIOPRoleManagerBusiness } from './aiop-role-manager.business';
import { AIOPRoleManagerWindow } from './aiop-role-manager.window';

@Component({
  selector: 'aiop-role-manager',
  templateUrl: './aiop-role-manager.component.html',
  styleUrls: ['./aiop-role-manager.component.less'],
  providers: [AIOPRoleManagerBusiness],
})
export class AIOPRoleManagerComponent implements OnInit {
  args = new AIOPRoleTableArgs();
  load = new EventEmitter<AIOPRoleTableArgs>();
  selecteds: Role[] = [];
  window = new AIOPRoleManagerWindow();
  constructor(
    private business: AIOPRoleManagerBusiness,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {}

  ondetails(item: Role) {
    this.window.details.role = item;
    this.window.details.show = true;
  }
  ondetailsok() {
    this.window.details.clear();
    this.window.details.show = false;
    this.args.tofirst = false;
    this.load.emit(this.args);
  }
  tocreate() {
    this.window.details.role = undefined;
    this.window.details.show = true;
  }

  todelete() {
    this.window.confirm.models = this.selecteds;
    this.window.confirm.show = true;
  }
  ondelete() {
    if (this.selecteds.length > 0) {
      this.business
        .delete(this.selecteds.map((x) => x.Id))
        .then((x) => {
          this.toastr.success('操作成功');
          this.args.tofirst = false;
          this.selecteds = [];
          this.load.emit(this.args);
        })
        .catch((x) => {
          this.toastr.error('操作失败');
        })
        .finally(() => {
          this.window.confirm.show = false;
        });
    }
  }
}

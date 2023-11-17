import { Component, EventEmitter, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AIOPUserTableArgs } from 'src/app/common/components/tables/aiop-user-table/aiop-user-table.model';
import { User } from 'src/app/network/model/garbage-station/user.model';
import { AIOPUserManagerBusiness } from './aiop-user-manager.business';
import { AIOPUserManagerWindow } from './aiop-user-manager.window';

@Component({
  selector: 'aiop-user-manager',
  templateUrl: './aiop-user-manager.component.html',
  styleUrls: ['./aiop-user-manager.component.less'],
  providers: [AIOPUserManagerBusiness],
})
export class AIOPUserManagerComponent implements OnInit {
  args = new AIOPUserTableArgs();
  load = new EventEmitter<AIOPUserTableArgs>();
  selecteds: User[] = [];
  window = new AIOPUserManagerWindow();
  constructor(
    private business: AIOPUserManagerBusiness,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {}

  onsearch(name: string) {
    this.args.name = name;
    this.args.tofirst = true;
    this.load.emit(this.args);
  }
  ondetails(user: User) {
    this.window.details.user = user;
    this.window.details.show = true;
  }
  ondetailsok() {
    this.window.details.clear();
    this.window.details.show = false;
    this.args.tofirst = false;
    this.load.emit(this.args);
  }
  onkey(item: User) {
    this.window.password.user = item;
    this.window.password.show = true;
  }
  tocreate() {
    this.window.details.user = undefined;
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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { ToastrService } from 'ngx-toastr';
import { Guid } from 'src/app/common/tools/guid';
import { Role } from 'src/app/network/model/garbage-station/role.model';
import { AIOPRoleDetailsBusiness } from './aiop-role-details.business';

@Component({
  selector: 'aiop-role-details',
  templateUrl: './aiop-role-details.component.html',
  styleUrls: ['./aiop-role-details.component.less'],
  providers: [AIOPRoleDetailsBusiness],
})
export class AIOPRoleDetailsComponent implements OnInit {
  @Input() role?: Role;

  @Output() ok: EventEmitter<void> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  constructor(
    private business: AIOPRoleDetailsBusiness,
    private toastr: ToastrService
  ) {}

  model = this.createModel();

  createModel() {
    let model = new Role();
    model.Id = Guid.NewGuid().ToString('N');
    model.PrivacyData = 0;
    model.StaticData = 0;
    model.UserData = 0;
    model.PictureData = 0;
    return model;
  }

  ngOnInit(): void {
    if (this.role) {
      let plain = instanceToPlain(this.role);
      this.model = plainToInstance(Role, plain);
    }
  }
  check() {
    if (!this.model.Name) {
      this.toastr.warning('请填写名称');
      return false;
    }
    return true;
  }
  onok() {
    if (this.check()) {
      let promise: Promise<boolean>;
      if (this.model.CreateTime) {
        promise = this.business.update(this.model);
      } else {
        promise = this.business.create(this.model);
      }
      promise
        .then((x) => {
          this.toastr.success('操作成功');
          this.ok.emit();
        })
        .catch((error) => {
          console.error(error);
          this.toastr.error('操作失败');
        });
    }
  }

  oncancel() {
    this.cancel.emit();
  }
}

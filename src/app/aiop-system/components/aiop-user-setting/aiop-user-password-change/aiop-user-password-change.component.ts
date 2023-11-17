import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { ToastrService } from 'ngx-toastr';
import { RegExpTool } from 'src/app/common/tools/reg-exp/reg-exp.tool';
import { User } from 'src/app/network/model/garbage-station/user.model';
import { AiopUserPasswordChangeBusiness } from './aiop-user-password-change.business';

@Component({
  selector: 'aiop-user-password-change',
  templateUrl: './aiop-user-password-change.component.html',
  styleUrls: ['./aiop-user-password-change.component.less'],
  providers: [AiopUserPasswordChangeBusiness],
})
export class AiopUserPasswordChangeComponent implements OnInit {
  @Input() user?: User;
  @Output() close: EventEmitter<void> = new EventEmitter();
  constructor(
    private business: AiopUserPasswordChangeBusiness,
    private toastr: ToastrService
  ) {}
  model?: User;
  ngOnInit(): void {
    if (this.user) {
      let plain = instanceToPlain(this.user);
      this.model = plainToInstance(User, plain);
    }
  }

  old?: string;
  password?: string;
  repeat?: string;

  check() {
    if (!this.model) {
      return false;
    }
    if (!this.old) {
      this.toastr.warning('请输入原密码');
      return false;
    }
    if (!(this.business.encrypt(this.old) === this.model.Password)) {
      this.toastr.warning('请正确输入原密码');
      return false;
    }
    if (!this.password) {
      this.toastr.warning('请输入新密码');
      return false;
    }
    if (!this.password.match(RegExpTool.UserPassowrd)) {
      this.toastr.warning('请输入正确的密码');
      return false;
    }
    if (!(this.repeat === this.password)) {
      this.toastr.warning('两次密码输入不一致');
      return false;
    }
    return true;
  }

  onok() {
    if (this.check() && this.model && this.password) {
      this.business
        .change(this.model.Id, this.password)
        .then((x) => {
          this.toastr.success('操作成功');
          this.close.emit();
        })
        .catch((error) => {
          console.error(error);
          this.toastr.error('操作失败');
        });
    }
  }
  oncancel() {
    this.close.emit();
  }
}

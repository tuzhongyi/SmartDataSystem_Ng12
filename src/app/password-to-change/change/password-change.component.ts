import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutePath } from 'src/app/app-routing.path';
import { MessageBar } from 'src/app/common/tools/message-bar';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { PasswordToChangeService } from '../password-to-change.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.less'],
  providers: [PasswordToChangeService],
})
export class PasswordChangeComponent implements OnInit, OnChanges {
  form: FormGroup = new FormGroup({
    password: new FormControl(''),
    repeat: new FormControl(''),
  });

  get password(): string {
    return this.form.value.password;
  }
  get repeat(): string {
    return this.form.value.repeat;
  }

  private _userId: string = '';
  public get userId(): string {
    if (!this._userId) {
      this._userId = this.local.user.Id;
    }
    return this._userId;
  }

  constructor(
    private router: Router,
    private local: LocalStorageService,
    private service: PasswordToChangeService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit() {}

  checkPassword() {
    if (!this.password) {
      MessageBar.response_warning('请填写密码。');
      return false;
    }
    let checked = this.password.match(
      '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\\W]{6,18}$'
    );
    if (!checked) {
      MessageBar.response_warning('字母和数字必须至少有1个，6-18个字符。');
      return false;
    }
    return true;
  }
  checkRepeat() {
    let checked = this.repeat === this.password;
    if (!checked) {
      MessageBar.response_warning('两次密码输入不一致，请确认一下新密码。');
    }
    return checked;
  }

  async changing() {
    let checked = this.checkPassword();
    if (!checked) return;
    checked = this.checkRepeat();
    if (!checked) return;

    let result = await this.service.change(this.userId, this.password);

    if (result.Id === this.userId) {
      MessageBar.response_success('密码修改成功，请重新登录。');
      this.router.navigateByUrl(RoutePath.login);
    }
    this.local.clear();
  }
}

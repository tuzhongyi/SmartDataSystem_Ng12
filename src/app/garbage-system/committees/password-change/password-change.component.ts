import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageBar } from 'src/app/common/tools/message-bar';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { StoreService } from 'src/app/common/service/store.service';

import { PasswordChangeService } from './password-change.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css'],
  providers: [PasswordChangeService],
})
export class PasswordChangeComponent implements OnInit {
  @Output()
  OnChanged: EventEmitter<void> = new EventEmitter();
  @Output()
  OnCancel: EventEmitter<void> = new EventEmitter();
  constructor(
    private service: PasswordChangeService,
    private local: LocalStorageService,
    private store: StoreService
  ) {}

  successed = false;
  readonly disabled = 'disabled';

  now: InputValue = new InputValue(() => {
    return this.form.value.now;
  }, true);

  old: InputValue = new InputValue(() => {
    return this.form.value.old;
  });

  repeat: InputValue = new InputValue(() => {
    return this.form.value.repeat;
  }, false);

  form: FormGroup = new FormGroup({
    old: new FormControl(''),
    now: new FormControl({ value: '', disabled: true }, Validators.required),
    repeat: new FormControl({ value: '', disabled: true }, Validators.required),
  });

  ngOnInit() {}

  checkOldPassword(event: Event) {
    if (!this.old.value()) {
      MessageBar.response_warning('请填写旧密码。');
      return;
    }
    this.old.compare = this.old.value() === this.store.password;
    if (this.old.compare) {
      this.form.controls.old.disable();
      this.form.controls.now.enable();
      this.form.controls.repeat.enable();
    } else {
      MessageBar.response_warning('请填写正确的密码。');
    }
  }

  checkPassword() {
    return !!this.now
      .value()
      .match('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\\W]{6,18}$');
  }

  oldBlur(event: Event) {
    if (!this.old.value()) {
      MessageBar.response_warning('请填写旧密码。');
      return;
    }

    this.now.compare = this.checkPassword();

    this.repeat.compare = this.repeat.value() === this.now.value();
  }

  nowBlur(event: Event) {
    if (!this.now.value()) {
      MessageBar.response_warning('请填写新密码。');
      return;
    }

    this.now.compare = this.checkPassword();
    if (!this.now.compare) {
      MessageBar.response_warning('字母和数字必须至少有1个，6-18个字符。');
    }
    this.repeat.compare = this.repeat.value() === this.now.value();
  }
  repeatBlur(event: Event) {
    if (!this.repeat.value()) {
      MessageBar.response_warning('两次密码输入不一致，请确认一下新密码。');
      return;
    }
    this.now.compare = this.checkPassword();
    if (!this.now.compare) {
      MessageBar.response_warning('字母和数字必须至少有1个，6-18个字符。');
    }
    this.repeat.compare = this.repeat.value() === this.now.value();
  }

  cancel(event: Event) {
    this.OnCancel.emit();
  }
  async change(event: Event) {
    if (!this.repeat.compare) {
      MessageBar.response_warning('两次密码输入不一致。');
      return;
    }
    if (this.old.compare && this.now.compare && this.repeat.compare) {
      let user = this.local.user;
      let result = await this.service.change(user.Id, this.repeat.value());
      if (result.Id == user.Id) {
        this.successed = true;
      }

      this.successed = true;
      this.OnChanged.emit();
      return;
    }
    MessageBar.response_warning('修改密码失败。');
  }

  logout(event: Event) {
    this.local.clear();
    window.location.href = this.store.loginPath;
  }
}

class InputValue {
  constructor(value: () => string, disabled = true) {
    this.value = value;
    this.disabled = disabled;
  }
  value: () => string;
  disabled: boolean = true;
  compare: boolean = false;
}

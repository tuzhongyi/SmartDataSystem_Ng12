import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PasswordCheckCodeResult } from 'src/app/network/request/user/user-request.params';

@Component({
  selector: 'app-password-index',
  templateUrl: './password-index.component.html',
  styleUrls: ['./password-index.component.css'],
})
export class PasswordIndexComponent implements OnInit {
  constructor(private title: Title) {
    title.setTitle('找回密码');
  }

  passwordCheckCodeResult?: PasswordCheckCodeResult;
  mobileNoChecked = false;
  ngOnInit() {}

  onCheckMobileNoResult(checked: PasswordCheckCodeResult) {
    this.passwordCheckCodeResult = checked;
    this.mobileNoChecked = checked.Result;
  }
}

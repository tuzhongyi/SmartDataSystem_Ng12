import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoutePath } from '../app-routing.path';
import { User } from '../network/model/garbage-station/user.model';
import { CheckCodeParams } from '../network/request/user/user-request.params';
import { UserRequestService } from '../network/request/user/user-request.service';
@Injectable()
export class PasswordGetBackService {
  constructor(
    private router: Router,
    private userService: UserRequestService
  ) {}

  loginSuccessedEvent: EventEmitter<User> = new EventEmitter();

  async checkMobileNo(mobileNo: string) {
    let fault = await this.userService.password.check.mobileNo(mobileNo);
    return fault.FaultCode === 0;
  }

  async urlToLogin() {
    this.router.navigateByUrl(RoutePath.login);
  }

  async getCheckCode(mobileNo: string) {
    return this.userService.password.check.code(mobileNo);
  }

  toCheckCode(mobileNo: string, code: string) {
    let params = new CheckCodeParams();
    params.MobileNo = mobileNo;
    params.CheckCode = code;
    return this.userService.password.check.check(params);
  }
}

import { Injectable } from '@angular/core';
import { User } from 'src/app/network/model/user.model';
import { SmsRequestService } from 'src/app/network/request/sms/sms-request.service';
import { UserRequestService } from 'src/app/network/request/user/user-request.service';

@Injectable()
export class MobileBindingService {
  constructor(
    private userService: UserRequestService,
    private smsService: SmsRequestService
  ) {}

  async check(mobileNo: string) {
    let response = await this.userService.password.check.mobileNo(mobileNo);
    return response.FaultCode === 0;
  }

  sendCheckCode(mobileNo: string) {
    return this.smsService.postAuthCodes(mobileNo);
  }

  async setUser(user: User) {
    let response = await this.userService.update(user);
    return response.FaultCode == 0;
  }
}

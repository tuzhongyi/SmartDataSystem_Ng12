import { Injectable } from '@angular/core';
import { ChangeUserPasswordParams } from 'src/app/network/request/user/user-request.params';
import { UserRequestService } from 'src/app/network/request/user/user-request.service';

@Injectable()
export class PasswordChangeService {
  constructor(private userService: UserRequestService) {}

  change(userId: string, password: string) {
    let params = new ChangeUserPasswordParams();
    params.Password = password;
    return this.userService.password.change(userId, params);
  }
}

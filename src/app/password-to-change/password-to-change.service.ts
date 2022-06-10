import { Injectable } from '@angular/core';
import { ChangeUserPasswordParams } from '../network/request/user/user-request.params';
import { UserRequestService } from '../network/request/user/user-request.service';

@Injectable()
export class PasswordToChangeService {
  constructor(private userService: UserRequestService) {}

  change(userId: string, password: string) {
    let params = new ChangeUserPasswordParams();
    params.Password = password;
    return this.userService.password.change(userId, params);
  }
}

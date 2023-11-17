import { Injectable } from '@angular/core';
import { CryptionTool } from 'src/app/common/tools/cryptions/cryption.tool';
import { ChangeUserPasswordParams } from 'src/app/network/request/user/user-request.params';
import { UserRequestService } from 'src/app/network/request/user/user-request.service';

@Injectable()
export class AiopUserPasswordChangeBusiness {
  key: string = 'howell6592440522';
  iv: string = 'howell1234567890';
  constructor(private service: UserRequestService) {}

  change(userId: string, password: string) {
    let params = new ChangeUserPasswordParams();
    params.Password = this.encrypt(password);
    return this.service.password.change(userId, params);
  }

  encrypt(password: string) {
    return CryptionTool.sm4.encrypt(this.key, this.iv, password);
  }
}

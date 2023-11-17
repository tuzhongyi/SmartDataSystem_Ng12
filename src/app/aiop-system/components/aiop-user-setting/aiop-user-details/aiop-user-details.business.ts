import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { CryptionTool } from 'src/app/common/tools/cryptions/cryption.tool';
import { Role } from 'src/app/network/model/garbage-station/role.model';
import { User } from 'src/app/network/model/garbage-station/user.model';
import { AIOPUserDetailsService } from './aiop-user-details.service';

@Injectable()
export class AIOPUserDetailsBusiness {
  constructor(
    private service: AIOPUserDetailsService,
    private local: LocalStorageService
  ) {}

  update(user: User) {
    user.UpdateTime = new Date();
    user.Password = undefined;
    return this.service.user.update(user);
  }
  create(user: User, password: string, role: Role) {
    let plain = instanceToPlain(user);
    let model = plainToInstance(User, plain);
    model.CreateTime = new Date();
    model.UpdateTime = new Date();
    let key: string = 'howell6592440522';
    let iv: string = 'howell1234567890';
    model.Password = CryptionTool.sm4.encrypt(key, iv, password);
    let expired = new Date();
    expired.setFullYear(expired.getFullYear() + 3);
    model.ExpiredTime = expired;
    model.CreatorId = this.local.user.Id;
    model.Role = [role];

    return this.service.user.create(model);
  }
}

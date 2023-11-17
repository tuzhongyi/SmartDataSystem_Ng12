import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Role } from 'src/app/network/model/garbage-station/role.model';
import { RoleRequestService } from 'src/app/network/request/role/role-request.service';

@Injectable()
export class AIOPRoleDetailsBusiness {
  constructor(private service: RoleRequestService) {}

  update(role: Role) {
    let plain = instanceToPlain(role);
    let model = plainToInstance(Role, plain);
    model.UpdateTime = new Date();
    return this.service.update(model);
  }
  create(role: Role) {
    let plain = instanceToPlain(role);
    let model = plainToInstance(Role, plain);
    model.CreateTime = new Date();
    model.UpdateTime = new Date();
    return this.service.create(model);
  }
}

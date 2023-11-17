import { Injectable } from '@angular/core';
import { RoleRequestService } from 'src/app/network/request/role/role-request.service';

@Injectable()
export class AIOPRoleManagerBusiness {
  constructor(private service: RoleRequestService) {}
  delete(ids: string[]) {
    let all = ids.map((x) => {
      return this.service.delete(x);
    });
    return Promise.all(all);
  }
}

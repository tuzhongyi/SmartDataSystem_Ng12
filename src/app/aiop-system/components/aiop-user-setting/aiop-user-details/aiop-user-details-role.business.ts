import { Injectable } from '@angular/core';
import { Role } from 'src/app/network/model/garbage-station/role.model';
import { RoleRequestService } from 'src/app/network/request/role/role-request.service';

@Injectable()
export class AIOPUserDetailsRoleBusiness {
  constructor(private service: RoleRequestService) {}

  datas: Role[] = [];
  selected?: Role;

  async load() {
    this.datas = await this.list();
    return this.datas;
  }

  async list() {
    let paged = await this.service.list();
    return paged.Data;
  }
  select(roleId: string) {
    this.selected = this.datas.find((x) => x.Id === roleId);
  }
}

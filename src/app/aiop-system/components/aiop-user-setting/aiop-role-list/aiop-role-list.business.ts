import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { Role } from 'src/app/network/model/garbage-station/role.model';
import { RoleRequestService } from 'src/app/network/request/role/role-request.service';

@Injectable()
export class AIOPRoleListBusiness implements IBusiness<Role[]> {
  constructor(private service: RoleRequestService) {}
  load(...args: any): Promise<Role[]> {
    return this.getData(args);
  }
  async getData(...args: any): Promise<Role[]> {
    let paged = await this.service.list();
    return paged.Data;
  }
}

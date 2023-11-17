import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { Role } from 'src/app/network/model/garbage-station/role.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { RoleRequestService } from 'src/app/network/request/role/role-request.service';
import { GetUsersParams } from 'src/app/network/request/user/user-request.params';
import { AIOPRoleTableArgs } from './aiop-role-table.model';

@Injectable()
export class AIOPRoleTableBusiness
  implements IBusiness<PagedList<Role>, PagedList<Role>>
{
  constructor(private service: RoleRequestService) {}
  async load(
    index: number,
    size: number,
    args: AIOPRoleTableArgs
  ): Promise<PagedList<Role>> {
    let data = await this.getData(index, size, args);
    return data;
  }
  getData(
    index: number,
    size: number,
    args: AIOPRoleTableArgs
  ): Promise<PagedList<Role>> {
    let params = new GetUsersParams();
    params.PageIndex = index;
    params.PageSize = size;
    return this.service.list(params);
  }
}

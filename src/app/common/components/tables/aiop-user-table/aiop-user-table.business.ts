import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { User } from 'src/app/network/model/garbage-station/user.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetUsersParams } from 'src/app/network/request/user/user-request.params';
import { UserRequestService } from 'src/app/network/request/user/user-request.service';
import { AIOPUserTableArgs } from './aiop-user-table.model';

@Injectable()
export class AIOPUserTableBusiness
  implements IBusiness<PagedList<User>, PagedList<User>>
{
  constructor(private service: UserRequestService) {}
  async load(
    index: number,
    size: number,
    args: AIOPUserTableArgs
  ): Promise<PagedList<User>> {
    let data = await this.getData(index, size, args);
    return data;
  }
  getData(
    index: number,
    size: number,
    args: AIOPUserTableArgs
  ): Promise<PagedList<User>> {
    let params = new GetUsersParams();
    params.PageIndex = index;
    params.PageSize = size;

    if (args.name) {
      if (args.name.match(/\w+/)) {
        params.MobileNo = args.name;
      } else {
        params.Name = args.name;
      }
    }
    return this.service.list(params);
  }
}

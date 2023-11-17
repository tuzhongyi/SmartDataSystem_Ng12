import { Injectable } from '@angular/core';
import { Role } from '../../model/garbage-station/role.model';
import { User } from '../../model/garbage-station/user.model';
import { Fault } from '../../model/howell-response.model';
import { PagedList } from '../../model/page_list.model';
import { RoleUrl } from '../../url/garbage/role.url';
import { BaseRequestService } from '../base-request.service';

import { HowellAuthHttpService } from '../howell-auth-http.service';
import { PagedParams } from '../IParams.interface';

@Injectable({
  providedIn: 'root',
})
export class RoleRequestService {
  constructor(http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(http);
  }

  private basic: BaseRequestService;

  get(id: string): Promise<Role> {
    let url = RoleUrl.item(id);
    return this.basic.get(url, Role);
  }
  async update(data: Role): Promise<boolean> {
    let url = RoleUrl.item(data.Id);
    let fault = await this.basic.put(url, Fault, data);
    return fault.FaultCode === 0;
  }
  async create(data: Role): Promise<boolean> {
    let url = RoleUrl.basic();
    let fault = await this.basic.post(url, Fault, data);
    return fault.FaultCode === 0;
  }
  delete(id: string): Promise<Fault> {
    let url = RoleUrl.item(id);
    return this.basic.delete(url, Fault);
  }
  list(params?: PagedParams): Promise<PagedList<Role>> {
    let url = RoleUrl.basic(params);
    return this.basic.get(url, PagedList<Role>);
  }

  private _user?: UsersService;
  public get user(): UsersService {
    if (!this._user) {
      this._user = new UsersService(this.basic);
    }
    return this._user;
  }
}
class UsersService {
  constructor(private basic: BaseRequestService) {}
  list(roleId: string, params: PagedParams): Promise<PagedList<User>> {
    let url = RoleUrl.user(roleId).basic(params);
    return this.basic.get(url, PagedList<User>);
  }

  get(roleId: string, userId: string) {
    let url = RoleUrl.user(roleId).item(userId);
    return this.basic.get(url, User);
  }
  update(roleId: string, user: User) {
    let url = RoleUrl.user(roleId).item(user.Id);
    return this.basic.post(url, Fault, user);
  }
  delete(roleId: string, userId: string) {
    let url = RoleUrl.user(roleId).item(userId);
    return this.basic.delete(url, Fault);
  }
}

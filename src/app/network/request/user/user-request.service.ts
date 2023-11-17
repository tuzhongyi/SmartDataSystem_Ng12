import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { UserConfigType } from 'src/app/enum/user-config-type.enum';
import { UserLabelType } from 'src/app/enum/user-label-type.enum';
import { Role } from '../../model/garbage-station/role.model';
import { UserLabel } from '../../model/garbage-station/user-label.model';
import { UserRecord } from '../../model/garbage-station/user-record.model';
import { User } from '../../model/garbage-station/user.model';
import { Fault } from '../../model/howell-response.model';
import { PagedList } from '../../model/page_list.model';
import { PasswordUrl } from '../../url/garbage/password.url';
import { UserLogUrl } from '../../url/garbage/user-log.url';
import { UserUrl } from '../../url/garbage/user.url';
import { BaseRequestService } from '../base-request.service';

import { HowellAuthHttpService } from '../howell-auth-http.service';
import { PagedParams } from '../IParams.interface';
import {
  ChangeUserPasswordParams,
  CheckCodeParams,
  GetUserLabelsParams,
  GetUserRecordListParams,
  GetUsersParams,
  PasswordCheckCodeResult,
  RandomUserPaswordParams,
} from './user-request.params';

@Injectable({
  providedIn: 'root',
})
export class UserRequestService {
  constructor(http: HowellAuthHttpService, router: Router) {
    this.basic = new BaseRequestService(http);
  }

  private basic: BaseRequestService;

  async get(id: string): Promise<User> {
    let url = UserUrl.item(id);
    let response = await this.basic.http.get(url).toPromise();
    return plainToInstance(User, response);
  }
  async update(data: User): Promise<boolean> {
    let url = UserUrl.item(data.Id);
    let fault = await this.basic.put(url, Fault, data);
    return fault.FaultCode === 0;
  }
  async create(data: User): Promise<boolean> {
    let url = UserUrl.basic();
    let fault = await this.basic.post(url, Fault, data);
    return fault.FaultCode === 0;
  }
  delete(id: string): Promise<Fault> {
    let url = UserUrl.item(id);
    return this.basic.delete(url, Fault);
  }

  list(
    params: GetUsersParams = new GetUsersParams()
  ): Promise<PagedList<User>> {
    let url = UserUrl.list();
    let data = instanceToPlain(params);
    return this.basic.paged(url, User, data);
  }

  private _config?: ConfigService;
  public get config(): ConfigService {
    if (!this._config) {
      this._config = new ConfigService(this.basic);
    }
    return this._config;
  }

  private _role?: RolesService;
  public get role(): RolesService {
    if (!this._role) {
      this._role = new RolesService(this.basic);
    }
    return this._role;
  }

  private _label?: LabelsService;
  public get label(): LabelsService {
    if (!this._label) {
      this._label = new LabelsService(this.basic);
    }
    return this._label;
  }

  private _password?: PasswordsService;
  public get password(): PasswordsService {
    if (!this._password) {
      this._password = new PasswordsService(this.basic);
    }
    return this._password;
  }

  private _log?: LogService;
  public get log(): LogService {
    if (!this._log) {
      this._log = new LogService(this.basic);
    }
    return this._log;
  }
}

class ConfigService {
  constructor(private basic: BaseRequestService) {}

  get(userId: string, type: UserConfigType): Promise<string> {
    let url = UserUrl.config(userId).item(type);
    return this.basic.http
      .getString(url)
      .toPromise()
      .catch((x) => {
        if (x.status === 200) {
          return x.error.text;
        }
      });
  }

  update(userId: string, type: UserConfigType, base64: string): Promise<Fault> {
    let url = UserUrl.config(userId).item(type);
    return this.basic.http.putBase64String<Fault>(url, base64).toPromise();
  }
}

class RolesService {
  constructor(private basic: BaseRequestService) {}

  list(userId: string, params?: PagedParams): Promise<PagedList<Role>> {
    let url = UserUrl.role(userId).basic(params);
    return this.basic.get(url, PagedList<Role>);
  }

  get(userId: string, id: string): Promise<Role> {
    let url = UserUrl.role(userId).item(id);
    return this.basic.get(url, Role);
  }
}

class LabelsService {
  constructor(private basic: BaseRequestService) {}

  list(params: GetUserLabelsParams): Promise<PagedList<UserLabel>> {
    let url = UserUrl.label().list();
    let data = instanceToPlain(params);
    return this.basic.post<PagedList<UserLabel>>(url, PagedList, data);
  }

  get(id: string, type: UserLabelType): Promise<UserLabel> {
    let url = UserUrl.label().type(id, type);
    return this.basic.get(url, UserLabel);
  }
  create(label: UserLabel): Promise<Fault> {
    let url = UserUrl.label().type(label.LabelId, label.LabelType);
    return this.basic.post(url, Fault, label);
  }
  update(label: UserLabel): Promise<Fault> {
    let url = UserUrl.label().type(label.LabelId, label.LabelType);
    return this.basic.put(url, Fault, label);
  }
  delete(id: string, type: UserLabelType) {
    let url = UserUrl.label().type(id, type);
    return this.basic.delete(url, Fault);
  }
}

class PasswordsService {
  constructor(private basic: BaseRequestService) {}

  random(userId: string, params: RandomUserPaswordParams): Promise<string> {
    let url = UserUrl.password(userId).random();
    let data = instanceToPlain(params);
    return this.basic.http.postReturnString(url, data).toPromise();
  }

  change(userId: string, params: ChangeUserPasswordParams) {
    let url = UserUrl.password(userId).change();
    let data = instanceToPlain(params);
    return this.basic.post(url, User, data);
  }

  private _check?: PasswordCheckService;
  public get check(): PasswordCheckService {
    if (!this._check) {
      this._check = new PasswordCheckService(this.basic);
    }
    return this._check;
  }
}

class PasswordCheckService {
  constructor(private basic: BaseRequestService) {}

  mobileNo(mobileNo: string): Promise<Fault> {
    let url = PasswordUrl.checkMobileNo(mobileNo);
    return this.basic.get(url, Fault);
  }

  code(mobileNo?: string) {
    let url = PasswordUrl.checkCode(mobileNo);
    return this.basic.http.getString(url).toPromise();
  }

  check(params: CheckCodeParams): Promise<PasswordCheckCodeResult> {
    let data = instanceToPlain(params);
    let url = PasswordUrl.checkCode();
    return this.basic.post(url, PasswordCheckCodeResult, data);
  }
}

class LogService {
  constructor(private basic: BaseRequestService) {}
  private _record?: LogUserRecordService;
  public get record(): LogUserRecordService {
    if (!this._record) {
      this._record = new LogUserRecordService(this.basic);
    }
    return this._record;
  }
}
class LogUserRecordService {
  constructor(private basic: BaseRequestService) {}

  list(params: GetUserRecordListParams): Promise<PagedList<UserRecord>> {
    let plain = instanceToPlain(params);
    let url = UserLogUrl.record.list();
    return this.basic.paged(url, UserRecord, plain);
  }
}

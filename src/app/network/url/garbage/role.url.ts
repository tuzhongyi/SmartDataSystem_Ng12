/*
 * @Author: pmx
 * @Date: 2021-09-13 15:05:27
 * @Last Modified by: zzl
 * @Last Modified time: 2021-12-21 17:26:04
 */

import { PagedParams } from '../../request/IParams.interface';
import { BasicUrl } from '../base.url';

import { ConfigInnerUrl } from './inner/config.url';
import { LabelInnerUrl } from './inner/label.url';
import { PasswordInnerUrl } from './inner/password.url';
import { RoleInnerUrl } from './inner/role.url';
import { UserInnerUrl } from './inner/user.url';
import { UrlHelper } from './url-helper';

export class RoleUrl {
  static basic(params?: PagedParams) {
    let query = UrlHelper.toQueryString(params);
    return `${BasicUrl.user}/Roles${query}`;
  }
  static item(id: string) {
    return `${this.basic()}/${id}`;
  }
  static list() {
    return `${this.basic()}/List`;
  }

  static user(roleId: string) {
    return new UserInnerUrl(this.item(roleId));
  }
}

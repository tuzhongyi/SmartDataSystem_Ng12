/*
 * @Author: pmx
 * @Date: 2021-09-13 15:05:27
 * @Last Modified by: zzl
 * @Last Modified time: 2021-12-21 17:26:04
 */

import { BaseUserUrl } from '../base.url';
import { ConfigInnerUrl } from './inner/config.url';
import { LabelInnerUrl } from './inner/label.url';
import { PasswordInnerUrl } from './inner/password.url';
import { RoleInnerUrl } from './inner/role.url';

export class UserUrl {
  static basic() {
    return `${BaseUserUrl}/Users`;
  }
  static login(username: string): string {
    return `${this.basic()}/Login/${username}`;
  }

  static item(id: string) {
    return `${this.basic()}/${id}`;
  }
  static list() {
    return `${this.basic()}/List`;
  }

  static role(userId: string) {
    return new RoleInnerUrl(this.item(userId));
  }

  static config(userId: string) {
    return new ConfigInnerUrl(this.item(userId));
  }

  static label() {
    return new LabelInnerUrl(this.basic());
  }
  static password(userId: string) {
    return new PasswordInnerUrl(this.item(userId));
  }
}

/*
 * @Author: pmx
 * @Date: 2021-09-13 15:05:27
 * @Last Modified by: zzl
 * @Last Modified time: 2021-12-21 17:26:04
 */

import { AbstractUrl } from '../abstract.url';
import { BasicUrl } from '../base.url';
import { ConfigInnerUrl } from './inner/config.url';
import { LabelInnerUrl } from './inner/label.url';
import { PasswordInnerUrl } from './inner/password.url';
import { RoleInnerUrl } from './inner/role.url';

export class UserUrl extends AbstractUrl {
  private static url = new UserUrl(`${BasicUrl.user}/Users`);

  static basic() {
    return this.url.basic();
  }
  static item(id: string) {
    return this.url.item(id);
  }
  static list() {
    return this.url.list();
  }
  static login(username: string): string {
    return `${this.basic()}/Login/${username}`;
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

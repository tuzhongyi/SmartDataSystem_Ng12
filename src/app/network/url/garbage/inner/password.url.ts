import { InnerUrl } from '../../base.url';

export class PasswordInnerUrl implements InnerUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/Passwords`;
  }
  item(id: string) {
    return `${this.basic()}/${id}`;
  }
  list() {
    return `${this.basic()}/List`;
  }

  random() {
    return `${this.basic()}/Random`;
  }

  change() {
    return `${this.basic()}/Change`;
  }
}

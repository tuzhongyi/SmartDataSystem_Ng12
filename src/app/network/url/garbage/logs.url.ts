import { AbstractUrl } from '../abstract.url';
import { BaseUrl } from '../base.url';

export class LogsUrl {
  static basic() {
    return `${BaseUrl.garbage.garbage_management}/Logs`;
  }
  static operations() {
    return new LogOperationUrl(this.basic());
  }
}
class LogOperationUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Operations`);
  }
}

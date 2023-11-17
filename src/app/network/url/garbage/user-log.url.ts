import { BaseUrl } from '../base.url';
import { UserRecordInnerUrl } from './inner/user_record.url';

export class UserLogUrl {
  static basic() {
    return `${BaseUrl.user_logs}/Logs`;
  }

  private static _record?: UserRecordInnerUrl;
  public static get record(): UserRecordInnerUrl {
    if (!this._record) {
      this._record = new UserRecordInnerUrl(this.basic());
    }
    return this._record;
  }
}

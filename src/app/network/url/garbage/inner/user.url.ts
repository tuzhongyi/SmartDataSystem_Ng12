import { PagedParams } from 'src/app/network/request/IParams.interface';
import { InnerUrl } from '../../base.url';
import { UrlHelper } from '../url-helper';

export class UserInnerUrl implements InnerUrl {
  constructor(private base: string) {}
  basic(params?: PagedParams) {
    let query = UrlHelper.toQueryString(params);
    return `${this.base}/Users${query}`;
  }
  item(id: string) {
    return `${this.basic()}/${id}`;
  }
  list() {
    return `${this.basic()}/List`;
  }
}

import { PagedParams } from 'src/app/network/request/IParams.interface';
import { AbstractUrl } from '../../abstract.url';
import { UrlHelper } from '../url-helper';

export class UserInnerUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/User`);
  }
  override basic(params?: PagedParams) {
    let query = UrlHelper.toQueryString(params);
    return `${this.base}${query}`;
  }
}

import { PagedParams } from '../../request/IParams.interface';

export class UrlHelper {
  static toQueryString(params?: PagedParams) {
    if (!params) return '';
    if (params.PageIndex && params.PageSize) {
      return `?=PageIndex${params.PageIndex}&PageSize=${params.PageSize}`;
    } else if (params.PageIndex) {
      return `?=PageIndex${params.PageIndex}`;
    } else if (params.PageSize) {
      return `?=PageSize${params.PageSize}`;
    } else {
      return '';
    }
  }
}

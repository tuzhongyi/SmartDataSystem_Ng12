import { PagedList } from '../network/model/page_list.model';
import { ServiceCache } from '../network/request/cache/service.cache';
import { IParams, PagedParams } from '../network/request/IParams.interface';

export interface IData {
  Id: string;
}

export interface IService<T extends IData> {
  cache: ServiceCache<T>;
  get: (id: string) => Promise<T>;
  update?: (data: T) => Promise<T>;
  create?: (data: T) => Promise<T>;
  delete?: (id: string) => Promise<T>;
  list: (args?: IParams) => Promise<PagedList<T>>;
}

export abstract class AbstractService<T extends IData> implements IService<T> {
  abstract list(args?: IParams): Promise<PagedList<T>>;
  abstract get(id: string): Promise<T>;
  async all(params: PagedParams = new PagedParams()) {
    let data: T[] = [];
    let index = 1;
    let paged: PagedList<T>;
    do {
      params.PageIndex = index;
      paged = await this.list(params);
      data = data.concat(paged.Data);
      index++;
    } while (index <= paged.Page.PageCount);
    return data;
  }
}
export interface AbstractService<T extends IData> {
  cache: ServiceCache<T>;
}

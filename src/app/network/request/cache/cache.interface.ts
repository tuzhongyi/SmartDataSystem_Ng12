import { IIdModel } from '../../model/model.interface';
import { PagedList } from '../../model/page_list.model';
import { IParams } from '../IParams.interface';
import { ServiceCache } from './service.cache';

export interface IService<T extends IIdModel> {
  cache: ServiceCache<T>;
  list: (params?: IParams, ...args: any[]) => Promise<PagedList<T>>;
  all: (params?: IParams, ...args: any[]) => Promise<PagedList<T>>;
}
export abstract class AbstractService<T extends IIdModel>
  implements IService<T>
{
  abstract list(params?: IParams, ...args: any[]): Promise<PagedList<T>>;
  abstract all(params?: IParams, ...args: any[]): Promise<PagedList<T>>;
}
export interface AbstractService<T extends IIdModel> {
  cache: ServiceCache<T>;
}

class AppCacheData {
  [key: string]: any;
}

export class AppCache {
  constructor(public timeout: number) {}
  private static data = new AppCacheData();

  private countdown(key: string, timeout: number) {
    setTimeout(() => {
      this.del(key);
    }, timeout);
  }

  get(key: string) {
    let str = AppCache.data[key];
    if (str) {
      return JSON.parse(str);
    }
    return undefined;
  }
  set(key: string, value: any, timeout: number) {
    AppCache.data[key] = JSON.stringify(value);
    this.countdown(key, timeout);
  }
  del(key: string) {
    delete AppCache.data[key];
  }
  reset() {
    AppCache.data = new AppCacheData();
  }
}

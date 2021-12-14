import { PagedList } from '../network/model/page_list.model';
import { ServiceCache } from '../network/request/cache/service.cache';
import { IParams } from '../network/request/IParams.interface';

export interface IData {
  Id: string;
}

/*
 * @Author: pmx
 * @Date: 2021-09-14 14:59:24
 * @Last Modified by: pmx
 * @Last Modified time: 2021-11-09 09:36:19
 */
export interface IBusiness<T extends IData> {
  cache: ServiceCache<T>;
  get(id: string): Promise<T>;
  update(data: T): Promise<T>;
  create(data: T): Promise<T>;
  delete(id: string): Promise<T>;
  list(args?: IParams): Promise<PagedList<T>>;
}

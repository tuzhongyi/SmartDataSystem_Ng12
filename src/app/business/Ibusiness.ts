import { PagedList } from '../model/page-list.model';
import { IParams } from '../network/request/IParams.interface';
/*
 * @Author: pmx
 * @Date: 2021-09-14 14:59:24
 * @Last Modified by: zzl
 * @Last Modified time: 2021-09-16 17:15:35
 */
export interface IBusiness<IData> {
  get(id: string): Promise<IData>;
  update(data: IData): Promise<IData>;
  create(data: IData): Promise<IData>;

  list<Params extends IParams>(args?: Params): Promise<PagedList<IData>>;
}

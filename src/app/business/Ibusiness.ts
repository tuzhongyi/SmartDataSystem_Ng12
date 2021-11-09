import { PagedList } from '../network/model/page_list.model';
import { IParams } from '../network/request/IParams.interface';
/*
 * @Author: pmx
 * @Date: 2021-09-14 14:59:24
 * @Last Modified by: pmx
 * @Last Modified time: 2021-11-09 09:36:19
 */
export interface IBusiness<IData> {
  get(id: string): Promise<IData>;
  update(data: IData): Promise<IData>;
  create(data: IData): Promise<IData>;
  delete(id: string): Promise<IData>;
  list(args?: IParams): Promise<PagedList<IData>>;
}

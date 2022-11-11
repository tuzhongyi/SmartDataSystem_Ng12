import { Division } from 'src/app/network/model/division.model';
import { ICreate, IDelete, IUpdate } from './bussiness.interface';

export interface ICollectionDivisionListBusiness<T> {
  get(...args: any[]): Promise<T>;
}

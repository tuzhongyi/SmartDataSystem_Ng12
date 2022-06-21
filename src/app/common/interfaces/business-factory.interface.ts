import { TreeBusinessEnum } from 'src/app/enum/tree-business.enum';
import { IService } from './business.interface';

export interface IBusinessFactory {
  createBusiness(name: TreeBusinessEnum): IService;
}


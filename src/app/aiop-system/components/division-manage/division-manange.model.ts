import {
  IBusiness,
  ICreate,
  IDelete,
  IUpdate,
} from 'src/app/common/interfaces/bussiness.interface';
import { Division } from 'src/app/network/model/division.model';
import { CommonModel } from '../../../view-model/common-model';

export class DivisionManageModel<T = any> implements CommonModel {
  data?: T;
  Id!: string;
  Name!: string;
  Description!: string;
}

export type TDivisionManageBusiness = ICreate<Division> &
  IDelete<Division> &
  IUpdate<Division>;

export interface IDivisionManageBusiness extends TDivisionManageBusiness {}

export interface IDivisionManageComponent {
  business: TDivisionManageBusiness;
}

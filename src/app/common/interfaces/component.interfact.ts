import { IModel } from 'src/app/network/model/model.interface';
import { IBusiness } from './bussiness.interface';

export interface IComponent<TModel extends IModel, TViewModel> {
  business: IBusiness<TModel, TViewModel>;
}


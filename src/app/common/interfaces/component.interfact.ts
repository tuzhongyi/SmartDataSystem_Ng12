import { IBusiness } from './bussiness.interface';

export interface IComponent<TModel, TViewModel> {
  business: IBusiness<TModel, TViewModel>;
}

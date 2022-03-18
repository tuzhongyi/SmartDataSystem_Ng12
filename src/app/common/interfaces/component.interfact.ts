import { IModel } from 'src/app/network/model/model.interface';
import { IBusiness, IExportBusiness } from './bussiness.interface';

export interface IComponent<TModel extends IModel, TViewModel> {
  business: IBusiness<TModel, TViewModel>|IExportBusiness<TModel, TViewModel>;
}


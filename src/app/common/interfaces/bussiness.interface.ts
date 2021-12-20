import { IConverter } from './converter.interface';
import { ISubscription } from './subscribe.interface';

export interface IBusiness<IModel, IViewModel> {
  Converter: IConverter<IModel, IViewModel>;
  subscription?: ISubscription;
  load(...args: any): Promise<IViewModel>;
  getData(...args: any): Promise<IModel>;
}

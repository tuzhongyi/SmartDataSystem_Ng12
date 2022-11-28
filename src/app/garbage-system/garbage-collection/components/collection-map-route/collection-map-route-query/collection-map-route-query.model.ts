import { IModel } from 'src/app/network/model/model.interface';

export class CollectionMapRouteDevice<T = IModel> {
  id: string = '';
  name: string = '';
  data?: T;
}

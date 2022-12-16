import { Model } from 'src/app/network/model/model.interface';

export class CollectionMapRouteDevice<T extends Model = any> {
  id: string = '';
  name: string = '';
  data?: T;
}

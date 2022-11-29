import {
  ICreate,
  IUpdate,
  IDelete,
  IBusiness,
} from 'src/app/common/interfaces/bussiness.interface';
import { CollectionPoint } from 'src/app/network/model/collection-point.model';

export interface IGarbageCollectionPointBusiness
  extends IBusiness<CollectionPoint>,
    ICreate<CollectionPoint>,
    IUpdate<CollectionPoint>,
    IDelete<CollectionPoint[]> {}

export interface IGarbageCollectionPointComponent {
  business: IGarbageCollectionPointBusiness;
}

import {
  ICreate,
  IUpdate,
  IDelete,
  IGet,
  IUpload,
  IDownload,
} from 'src/app/common/interfaces/bussiness.interface';
import { CollectionPoint } from 'src/app/network/model/collection-point.model';

export interface IGarbageCollectionPointBusiness
  extends IGet<CollectionPoint>,
    ICreate<CollectionPoint>,
    IUpdate<CollectionPoint>,
    IDelete<CollectionPoint[]>,
    IUpload,
    IDownload {}

export interface IGarbageCollectionPointComponent {
  business: IGarbageCollectionPointBusiness;
}

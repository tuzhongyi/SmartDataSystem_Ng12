import {
  ICreate,
  IDelete,
  IDownload,
  IGet,
  IUpdate,
  IUpload,
} from 'src/app/common/interfaces/bussiness.interface';
import { CollectionPoint } from 'src/app/network/model/garbage-station/collection-point.model';

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

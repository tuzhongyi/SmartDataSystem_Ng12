import {
  IBusiness,
  ICreate,
  IUpdate,
  IDelete,
  IUpload,
  IGet,
  IDownload,
} from 'src/app/common/interfaces/bussiness.interface';
import { CollectionTrashCan } from 'src/app/network/model/trash-can.model';

export interface IGarbageCollectionPointTrashCanManagerBusiness
  extends IGet<CollectionTrashCan>,
    ICreate<CollectionTrashCan>,
    IUpdate<CollectionTrashCan>,
    IDelete<CollectionTrashCan[]>,
    IUpload,
    IDownload {}

export interface IGarbageCollectionPointTrashCanManagerComponent {
  business: IGarbageCollectionPointTrashCanManagerBusiness;
}

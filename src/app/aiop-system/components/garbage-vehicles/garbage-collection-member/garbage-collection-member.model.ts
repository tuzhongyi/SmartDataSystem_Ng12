import {
  IBusiness,
  ICreate,
  IUpdate,
  IDelete,
  IUpload,
  IGet,
  IDownload,
} from 'src/app/common/interfaces/bussiness.interface';
import { CollectionMember } from 'src/app/network/model/member.model';

export interface IGarbageCollectionMemberBusiness
  extends IGet<CollectionMember>,
    ICreate<CollectionMember>,
    IUpdate<CollectionMember>,
    IDelete<CollectionMember[]>,
    IUpload,
    IDownload {}

export interface IGarbageCollectionMemberComponent {
  business: IGarbageCollectionMemberBusiness;
}

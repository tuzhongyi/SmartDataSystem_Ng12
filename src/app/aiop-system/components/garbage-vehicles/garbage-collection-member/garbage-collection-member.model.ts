import {
  ICreate,
  IDelete,
  IDownload,
  IGet,
  IUpdate,
  IUpload,
} from 'src/app/common/interfaces/bussiness.interface';
import { CollectionMember } from 'src/app/network/model/garbage-station/member.model';

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

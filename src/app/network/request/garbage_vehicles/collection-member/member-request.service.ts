import { Injectable } from '@angular/core';
import { CollectionMember } from 'src/app/network/model/member.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GarbageVehicleMemberUrl } from 'src/app/network/url/garbage-vehicle/member.url';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../../base-request.service';
import { HowellAuthHttpService } from '../../howell-auth-http.service';
import { GetCollectionMembersParams } from './member-request.params';
@Injectable({
  providedIn: 'root',
})
export class CollectionMemberRequsetService {
  private basic: BaseRequestService;
  private type: BaseTypeRequestService<CollectionMember>;
  constructor(private _http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(_http);
    this.type = this.basic.type(CollectionMember);
  }

  get(id: string): Promise<CollectionMember> {
    let url = GarbageVehicleMemberUrl.item(id);
    return this.type.get(url);
  }
  update(data: CollectionMember): Promise<CollectionMember> {
    let url = GarbageVehicleMemberUrl.item(data.Id);
    return this.type.put(url, data);
  }
  create(data: CollectionMember): Promise<CollectionMember> {
    let url = GarbageVehicleMemberUrl.basic();
    return this.type.post(url, data);
  }
  delete(id: string): Promise<CollectionMember> {
    let url = GarbageVehicleMemberUrl.item(id);
    return this.type.delete(url);
  }
  list(
    params: GetCollectionMembersParams = new GetCollectionMembersParams()
  ): Promise<PagedList<CollectionMember>> {
    let url = GarbageVehicleMemberUrl.list();
    return this.type.paged(url, params);
  }

  excel(data?: BinaryData) {
    let url = GarbageVehicleMemberUrl.excels();
    if (data) {
      return this.basic.postReturnString(url, data);
    } else {
      return this.basic.getExcel(url);
    }
  }
}

import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';

import { CollectionMember } from 'src/app/network/model/garbage-station/member.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetCollectionMembersParams } from 'src/app/network/request/garbage_vehicles/collection-member/member-request.params';
import { CollectionMemberRequsetService } from 'src/app/network/request/garbage_vehicles/collection-member/member-request.service';
import { PagedParams } from 'src/app/network/request/IParams.interface';

@Injectable()
export class AiopGarbageCollectionMemberTableBusiness
  implements IBusiness<PagedList<CollectionMember>>
{
  constructor(private service: CollectionMemberRequsetService) {}
  load(
    index: number,
    size: number,
    divisionId?: string,
    name?: string
  ): Promise<PagedList<CollectionMember>> {
    let page = new PagedParams();
    page.PageIndex = index;
    page.PageSize = size;

    return this.getData(page, divisionId, name);
  }
  getData(
    paged: PagedParams,
    divisionId?: string,
    name?: string
  ): Promise<PagedList<CollectionMember>> {
    let params = new GetCollectionMembersParams();
    params.PageIndex = paged.PageIndex;
    params.PageSize = paged.PageSize;
    params.DivisionId = divisionId;
    params.Name = name;
    return this.service.list(params);
  }
}
